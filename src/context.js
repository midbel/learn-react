import React, {
  useState,
  useMemo
} from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticate } from './api.js'

const UserContext = React.createContext({ user: '', pass: '' })

function initialState() {
  return {
    user: '',
    pass: ''
  }
}

function AuthProvider({ signin, home, children }) {
  const [user, setUser] = useState(initialState())
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function signin(email, pass) {
    setError('')
    setAuthenticated(false)
    if (!email || !pass) {
      setError("email/password should be provided")
      return
    }
    authenticate(email, pass).then(body => {
      setAuthenticated(true)
      setUser({ user: email, pass: pass })
      navigate(home, { replace: true })
    }).catch(err => setError(err.toString()))
  }

  function signout() {
    setError('')
    setAuthenticated(false)
    setUser(undefined)
    navigate(signin, { replace: true })
  }

  function isAuthenticated() {
    return authenticated
  }

  const memo = useMemo(() => ({
    user,
    error,
    signin,
    signout,
    isAuthenticated
  }), [user, error, signin, signout, isAuthenticated])

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
