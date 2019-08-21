import React from 'react'
import { Link } from 'react-router-dom'

class User extends React.Component {

  state = {
    users: []
  }

  componentDidMount () {
    if (!localStorage.getItem("access-token")) {
      return null
    }
    fetch('http://localhost:3000/users/whoami', {
      headers: {
        "access-token": localStorage.getItem('access-token'),
        uid: localStorage.getItem('uid'),
        expiry: localStorage.getItem('expiry'),
        client: localStorage.getItem('client')
      }
    })
    .then(resp => resp.json())

    fetch('http://localhost:3000/users', {
      headers: {
        "access-token": localStorage.getItem('access-token'),
        uid: localStorage.getItem('uid'),
        expiry: localStorage.getItem('expiry'),
        client: localStorage.getItem('client')
      }
    })
    .then(resp => resp.json())
    .then(data => this.setState({
      users: data
    }))
  }

render() {
  if (!localStorage.getItem("access-token")) {
    this.props.history.push("/login")
    return null
  }
  return (
    <div>
      <h1>Users</h1>
        <ul className="list-group" style={{ maxWidth: "33%" }}>
          {this.state.users.map(user => (
            <li key={`user ${user.id}`} className="list-group-item d-flex justify-content-between align-items-center">
              <Link to={`/users/${user.id}`}><b>{user.name}</b></Link>
              <span className="badge badge-primary badge-pill">Likes: {`${user.reputation}`}</span>
            </li>
          ))}
        </ul>
    </div>
    )
  }
}

export default User