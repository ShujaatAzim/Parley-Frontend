import React from "react";
import { signInUser } from "../redux-token-auth-config"
import { connect } from 'react-redux'

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    submitted: false
  }

  onEmailChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  submitForm = async (e) => {
    e.preventDefault()
    const { signInUser } = this.props
    const {
      email,
      password,
    } = this.state
    try {
      const resp = await signInUser({ email, password })
      console.log(resp)
      this.props.history.push("/")
    } catch (e) {
      console.warn(e);
    }
  }

  render() {

    return (
      <form style={{ maxWidth: "50%"}}>
        <div className="form-group">
          <label><b>Email</b></label>
          <input type="email" className="form-control" placeholder="Enter Your Email" value={this.state.email} onChange={this.onEmailChange}/>
          <small id="emailHelp" className="form-text text-muted">We will <em>never</em> share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label><b>Password</b></label>
          <input type="password" className="form-control" placeholder="Enter Your Password" value={this.state.password} onChange={this.onPasswordChange}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.submitForm}>Submit</button>
      </form>
    )
  }
}

export default connect(
  null, 
  { signInUser }
)(Login)