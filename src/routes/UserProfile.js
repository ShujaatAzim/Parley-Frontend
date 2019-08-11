import React from 'react'

class UserProfile extends React.Component {

  state = {
    currentUser: {},
    params: parseInt(this.props.match.params.id)
  }

  componentDidMount() {
    fetch('http://localhost:3000/users/')
    .then(resp => resp.json())
    .then(users => {
      const currentUser = users.find(user => user.id === this.state.params)
      this.setState({
        currentUser
      })
    })
  }

  render() {
    return <h1>{this.state.currentUser.name}</h1>
  }
}

export default UserProfile