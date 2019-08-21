import React from "react";

class Profile extends React.Component {

  state = {
    loggedInUser: localStorage.getItem("uid"),
    currentUser: {}
  }

  componentDidMount() {
    if (!localStorage.getItem("access-token")) {
      return null
    }
    fetch('http://localhost:3000/users', {
      headers: {
        "access-token": localStorage.getItem('access-token'),
        uid: localStorage.getItem('uid'),
        expiry: localStorage.getItem('expiry'),
        client: localStorage.getItem('client')
      }
    })
    .then(resp => resp.json())
    .then(users => {
      const currentUser = users.find(user => user.email === this.state.loggedInUser)
      console.log(currentUser)
      this.setState({
        currentUser: currentUser
      })
    })
  

  }

  render() {
    if (!localStorage.getItem("access-token")) {
      this.props.history.push("/login")
      return null
    }
    
    return (
      <div>
        <h2>{this.state.currentUser.name}</h2>
        <div>
        <img src={`${this.state.currentUser.image}`} alt=""/>
        </div>
      </div>
    )
  }
}

export default Profile