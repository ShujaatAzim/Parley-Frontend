import React from "react";

class Login extends React.Component {

  state = {
    username: "",
    submitted: false
  }

  usernameChangeHandler(event) {
    this.setState({ username: event.target.value });
  }
  usernameSubmitHandler(event) {
    event.preventDefault();
    this.setState({ submitted: true, username: this.state.username });
  }

  render() {

    return (
      <form onSubmit={this.usernameSubmitHandler} className="username-container">
        <h1>Login</h1>
        <div>
          <input
            type="text"
            onChange={this.usernameChangeHandler}
            placeholder="Name"
            required />
        </div>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default Login