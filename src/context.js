import React, {
  useState,
  useEffect,
  useMemo
} from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticate} from './api.js'
import { getPayload } from './token.js'

const UserContext = React.createContext({ user: '', pass: '' })

function initialState() {
  return {id: 0}
}

function storeToken(token) {
  localStorage.setItem('token', token)
  if (!token) {
    localStorage.removeItem('token')
  }
}

function storeUser(user) {
  if (!user) {
    localStorage.removeItem('user')
    return
  }
  localStorage.setItem('user', JSON.stringify(user))
}

function getToken() {
  return localStorage.getItem('token') || ''
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch(_) {
    return initialState()
  }
}

function AuthProvider({ sign, home, children }) {
  const [user, setUser] = useState(getUser())
  const [token, setToken] = useState(getToken())
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    storeToken(token)
  })

  function signin(email, pass) {
    setError('')
    setToken('')
    if (!email || !pass) {
      setError("email/password should be provided")
      return
    }
    authenticate(email, pass).then(body => {
      const {token, ...data} = body
      user.id = data.item.id
      setToken(token)
      storeToken(token)
      setUser(user)
      storeUser(user)
      navigate(home, { replace: true })
    }).catch(err => setError(err.toString()))
  }

  function signout() {
    setError('')
    setToken('')
    storeToken('')
    storeUser()
    setUser(initialState())
    navigate(signin, { replace: true })
  }

  function isAuthenticated() {
    try {
      getPayload(token)
      return true
    } catch(err) {
      return false
    }
  }

  const memo = useMemo(() => ({
    user,
    error,
    token,
    signin,
    signout,
    isAuthenticated
  }), [user, error, token, signin, signout, isAuthenticated])

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
