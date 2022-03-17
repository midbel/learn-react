import React from 'react'
import { Navigate } from 'react-router-dom'

class Signin extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pass: '',
      authenticated: false
    }

    this.onUserChanged = this.onUserChanged.bind(this)
    this.onPassChanged = this.onPassChanged.bind(this)
    this.onSignin = this.onSignin.bind(this)
  }

  onUserChanged(e) {
    this.setState({user: e.target.value})
  }

  onPassChanged(e) {
    this.setState({pass: e.target.value})
  }

  onSignin(e) {
    e.preventDefault()
    this.setState({authenticated: true})
  }

  render() {
    if (this.state.authenticated) {
      return <Navigate to="/" replace={true}/>
    }
    return (<main className="form-signin mx-auto text-center" style={{marginTop: '200px', width: '280px'}}>
      <form onSubmit={this.onSignin}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input type="email"
            className="form-control"
            id="user"
            placeholder="name@example.com"
            value={this.state.user}
            onChange={this.onUserChanged} />
          <label htmlFor="user">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password"
            className="form-control"
            id="pass"
            placeholder="Password"
            value={this.state.pass}
            onChange={this.onPassChanged} />
          <label htmlFor="pass">Password</label>
        </div>
        <div className="my-3"/>
        <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={this.onSignin}>Sign in</button>
      </form>
    </main>)
  }
}

export default Signin
