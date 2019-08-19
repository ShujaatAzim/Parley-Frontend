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
          <li key={`chat ${chat.id}`}><Link to={`/chats/${chat.id}`}>Chat - {chat.topic.name} - Participants: {chat.users[0].name} and {chat.users[1].name} </Link></li>)}
      </ul>
    )
  }
}

export default Chats