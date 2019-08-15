import React from "react";

class Login extends React.Component {

  state = {
    username: "",
    submitted: false
  }

  render() {

    return (
      <form>
        <div className="form-group">
          <label><b>Name</b></label>
          <input type="email" className="form-control" placeholder="Enter Your Name"/>
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