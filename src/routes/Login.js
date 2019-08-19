import React from "react";

class Login extends React.Component {

  state = {
    username: "",
    submitted: false
  }

  render() {

    return (
      <form style={{ maxWidth: "50%"}}>
        <div className="form-group">
          <label><b>Email</b></label>
          <input type="email" className="form-control" placeholder="Enter Your Email"/>
          <small id="emailHelp" className="form-text text-muted">We will <em>never</em> share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label><b>Password</b></label>
          <input type="password" className="form-control" placeholder="Enter Your Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

export default Login