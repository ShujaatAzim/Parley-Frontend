import React from 'react'
import { Link } from 'react-router-dom'

class User extends React.Component {

  state = {
    users: []
  }

  componentDidMount () {
    fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(data => this.setState({
      users: data
    }))
  }

  render() {

    return (
      <ul>
        {this.state.users.map(user => (
          <li key={`user ${user.id}`}><Link to={`/users/${user.id}`}>{user.name}</Link></li>
        ))}
      </ul>
    )
  }
}

export default User