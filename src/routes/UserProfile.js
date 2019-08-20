import React from 'react'

class UserProfile extends React.Component {

  state = {
    currentUser: {},
    params: parseInt(this.props.match.params.id)
  }

  componentDidMount() {
    if (!localStorage.getItem("access-token")) {
      return null
    }
    fetch('http://localhost:3000/users/', {
      headers: {
        "access-token": localStorage.getItem('access-token'),
         uid: localStorage.getItem('uid'),
         expiry: localStorage.getItem('expiry'),
         client: localStorage.getItem('client'),
       }
    })
    .then(resp => resp.json())
    .then(users => {
      const currentUser = users.find(user => user.id === this.state.params)
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
    return <h1>{this.state.currentUser.name}</h1>
  }
}

export default UserProfile