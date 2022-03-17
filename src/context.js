import React, {
  useState,
  useMemo
} from 'react'
import { useNavigate } from 'react-router-dom'

const UserContext = React.createContext({ user: '', pass: '' })

function initialState() {
  return {
    user: 'pierre.dubois@midbel.org',
    pass: 'supersecurepassword'
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(initialState())
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function signin(email, pass) {
    setError('')
    if (!email || !pass) {
      setError("email/password should be provided")
      return
    }
    setAuthenticated(true)
    setUser({ user: email, pass: pass })
    navigate('/', { replace: true })
  }

  function signout() {
    setError('')
    setAuthenticated(false)
    setUser(undefined)
    navigate('/signin', { replace: true })
  }

  function isAuthenticated() {
    return authenticated
  }

  const memo = useMemo(() => ({
    user,
    error,
    signin,
    signout,
    authenticated
  }), [user, error, signin, signout, authenticated])

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
