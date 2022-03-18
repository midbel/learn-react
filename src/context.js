import React, {
  useState,
  useEffect,
  useMemo,
  useReducer
} from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticate} from './api.js'
import { getPayload } from './token.js'

const UserContext = React.createContext({ user: '', pass: '' })

function storeToken(token) {
  if (!token) {
    localStorage.removeItem('token')
    return
  }
  localStorage.setItem('token', token)
}

function storeUser(user) {
  if (!user) {
    localStorage.removeItem('user')
    return
  }
  localStorage.setItem('user', JSON.stringify(user))
}

function initialUser() {
  return {id: 0}
}

function initialState() {
  let user;
  try {
    user = JSON.parse(localStorage.getItem('user')) || initialUser()
  } catch(_) {
    user = initialUser()
  }
  return {
    user,
    token: localStorage.getItem('token') || '',
    error: '',
  }
}

function userReducer(state, {type, payload}) {
  switch (type) {
    case 'invalid':
      return {
        ...state,
        user: initialUser(),
        error: payload.error,
        token: '',
      }
    case 'signin':
      storeToken(payload.token)
      storeUser(payload.user)
      return {
        user: payload.user,
        token: payload.token,
        error: ''
      }
    case 'signout':
      storeToken()
      storeUser()
      return {
        user: initialUser(),
        token: '',
        error: '',
      }
    default:
      throw new Error(`unhandled transition: ${type}`)
  }
}

function AuthProvider({ sign, home, children }) {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(userReducer, initialState())

  function signin(email, pass) {
    if (!email || !pass) {
      dispatch({type: 'invalid', payload: {
        error: 'email/password should be provided',
      }})
      return
    }
    authenticate(email, pass).then(body => {
      const {token, ...data} = body
      dispatch({type: 'signin', payload: {
        token,
        user: data.item,
      }})
      navigate(home, { replace: true })
    }).catch(err => {
      const error = err.toString()
      dispatch({type: 'invalid', payload: { error }})
    })
  }

  function signout() {
    dispatch({type: 'signout'})
    navigate(signin, { replace: true })
  }

  function isAuthenticated() {
    try {
      getPayload(state.token)
      return true
    } catch(err) {
      return false
    }
  }

  const memo = useMemo(() => ({
    ...state,
    signin,
    signout,
    isAuthenticated
  }), [state.user, state.error, state.token, signin, signout, isAuthenticated])

  return (<UserContext.Provider value={memo}>
    {children}
  </UserContext.Provider>)
}

function useAuth() {
  const ctx = React.useContext(UserContext)
  if (ctx === undefined) {
    throw new Error("useAuth should be used within a AuthProvider")
  }
  return ctx
}

export { AuthProvider, useAuth }
