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
    <ul className="list-group" style={{ maxWidth: "33%" }}>
      {this.state.users.map(user => (
        <li key={`user rep ${user.reputation}`} className="list-group-item d-flex justify-content-between align-items-center">
          <Link to={`/users/${user.id}`}><b>{user.name}</b></Link>
          <span className="badge badge-primary badge-pill">Likes: {`${user.reputation}`}</span>
        </li>
      ))}
    </ul>
    )
  }
}

export default User