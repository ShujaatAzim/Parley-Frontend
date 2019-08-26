import React from "react";
import { signInUser } from "../redux-token-auth-config"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  }

  onEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  onPasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  submitForm = async (event) => {
    event.preventDefault()
    const { signInUser } = this.props
    const { email, password } = this.state
    try {
      await signInUser({ email, password })
      this.props.history.push("/home")
    } catch (event) {
      swal({
        text: "Incorrect email and/or password, please try again.",
        icon: "error",
        button: "Ok"
      })
      this.setState({
        email: "",
        password: ""
      })
    }
  }

  render() {

    const { email, password } = this.state;
    const isEnabled = email.length > 0 && password.length > 0 && email.includes("@");

    return (
      <div className="row">
        <div className="col" style={{ maxWidth: "50%"}}>
          <h2>Welcome to Parley!</h2>
          <p>This is some info about Parley.</p>
        </div>
        <div className="col" style={{ maxWidth: "50%"}}>
          <form>
            <div className="form-group">
              <label><b>Email</b></label>
              <input type="email" className="form-control" placeholder="Enter Your Email" value={this.state.email} onChange={this.onEmailChange}/>
              <small id="emailHelp" className="form-text text-muted">We will <em>never</em> share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label><b>Password</b></label>
              <input type="password" className="form-control" placeholder="Enter Your Password" value={this.state.password} onChange={this.onPasswordChange}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.submitForm} disabled={!isEnabled}>Submit</button><br /><br />
            Not yet a Parleyer? <Link to="/register"><b>Sign up!</b></Link>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(
  null, 
  { signInUser }
)(Login)