import React from 'react'
import { Link } from 'react-router-dom'

class Chats extends React.Component {

  state = {
    allChats: []
  }

  componentDidMount() {
    if (!localStorage.getItem("access-token")) {
      return null
    }
    fetch('http://localhost:3000/chats', {
      headers: {
        "access-token": localStorage.getItem('access-token'),
        uid: localStorage.getItem('uid'),
        expiry: localStorage.getItem('expiry'),
        client: localStorage.getItem('client')
      }
    })
    .then(resp => resp.json())
    .then(chats => this.setState({
      allChats: chats
    }))
  }

  render() {
    if (!localStorage.getItem("access-token")) {
      this.props.history.push("/login")
      return null
    }
    return (
      <div>
        <h1>Chats</h1>
        <ul className="list-group" style={{ maxWidth: "65%" }}>
          {this.state.allChats.map(chat => 
            <li className="list-group-item d-flex justify-content-between align-items-center" 
              key={`chat ${chat.id}`}><Link to={`/chats/${chat.id}`}>
              <b>{chat.topic.name}</b></Link> <b><Link to={`/users/${chat.users[0].id}`}>{chat.users[0].name}</Link> & 
              <Link to={`/users/${chat.users[1].id}`}> {chat.users[1].name}</Link></b>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Chats