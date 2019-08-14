import React from 'react'
import { Link } from 'react-router-dom'

class Chats extends React.Component {

  state = {
    allChats: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/chats')
    .then(resp => resp.json())
    .then(chats => this.setState({
      allChats: chats
    }))
  }

  render() {
    return (
      <ul>
        {this.state.allChats.map(chat => 
          <li key={`chat ${chat.id}`}><Link to={`/chats/${chat.id}`}>Chat {chat.id}</Link></li>)}
      </ul>
    )
  }
}

export default Chats