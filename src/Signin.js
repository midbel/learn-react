import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './context.js'

function Signout() {
  return <Navigate to="/signin"/>
}

function Warning(props) {
  return (<aside className="alert alert-danger text-center">
    <p>{props.error}</p>
  </aside>)
}

function Signin() {
  const { user, error, signin } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    signin(form.get('user'), form.get('pass'))
  }

  return (<main
      className="form-signin mx-auto text-center"
      style={{marginTop: '200px', width: '280px'}}>
    <form onSubmit={handleSubmit}>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
      {error && <Warning error={error}/>}
      <div className="form-floating">
        <input type="email"
          className="form-control"
          id="user"
          name="user"
          defaultValue={user.user}
          placeholder="name@example.com"/>
        <label htmlFor="user">Email address</label>
      </div>
      <div className="form-floating">
        <input type="password"
          className="form-control"
          id="pass"
          name="pass"
          defaultValue={user.pass}
          placeholder="Password"/>
        <label htmlFor="pass">Password</label>
      </div>
      <div className="my-3"/>
      <button className="w-100 btn btn-lg btn-primary" type="submit">
        <span>Sign in</span>
      </button>
    </form>
  </main>)
}

export { Signin, Signout }
