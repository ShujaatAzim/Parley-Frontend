import React from 'react' 
import { registerUser } from '../redux-token-auth-config'
import { connect } from 'react-redux'

class RegisterPage extends React.Component {

  state = {
    email: "",
    password: "",
    name: "",
    location: "",
    age: "",
    picture: "",
    reputation: 0
  }

  submitForm = async (event) => {
    event.preventDefault()
    const { registerUser } = this.props
    const { email, password, name, location, age, picture, reputation } = this.state
    try {
      await registerUser({ email, password, name, location, age, picture, reputation })
      this.props.history.push("/login")
    } catch (event) {
      alert("Invalid fields, please recheck")
    }
    
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

  onNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  onLocationChange = (event) => {
    this.setState({
      location: event.target.value
    })
  }

  onAgeChange = (event) => {
    this.setState({
      age: event.target.value
    })
  }

  onPictureChange = (event) => {
    this.setState({
      picture: event.target.value
    })
  }

  render() {
    const { submitForm } = this
    
    return (
      <div>
        <h2>Sign up for Parley!</h2><br />
        <form onSubmit={submitForm}>
          <div className="form-row">
            <div className="col">
              <label><b><span role="img" aria-label="email">✉️</span> Email</b></label>
                <input type="email" className="form-control" placeholder="enter your email" value={this.state.email} onChange={this.onEmailChange}/>
            </div>
            <div className="col">
              <label><b><span role="img" aria-label="password">🔒</span> Password</b></label>
              <input type="password" className="form-control" placeholder="create your password" value={this.state.password} onChange={this.onPasswordChange}/>
            </div>
          </div>
          <br />
          <div className="form-row">
            <div className="col">
              <label><b><span role="img" aria-label="fullname">👤</span> Full Name</b></label>
              <input type="name" className="form-control" placeholder="enter your first & last name" value={this.state.name} onChange={this.onNameChange}/>
            </div>
            <div className="col">
              <label><b><span role="img" aria-label="location">📍</span> Location</b></label>
              <input type="location" className="form-control" placeholder="enter your location" value={this.state.location} onChange={this.onLocationChange}/>
            </div>
          </div>
          <br />
          <div className="form-row">
            <div className="col">
              <label><b><span role="img" aria-label="Age">🗓️</span> Age</b></label>
              <input type="age" className="form-control" placeholder="enter your age in years" value={this.state.age} onChange={this.onAgeChange}/>
            </div>
            <div className="col">
              <label><b><span role="img" aria-label="Picture">📸</span> Picture URL</b></label>
              <input type="picture" className="form-control" value={`https://robohash.org/${this.state.email}`} onChange={this.onPictureChange}/>
            </div>
          </div>
          <br /><br />
          <button type="submit" className="btn btn-primary" onClick={this.submitForm}>Create User</button>
        </form>
      </div>
    )
  }
}

export default connect(
null,
  { registerUser },
)(RegisterPage)