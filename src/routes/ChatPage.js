import React from 'react'
import { Link } from 'react-router-dom'

class ChatPage extends React.Component {

  state = {
      currentChat: {
        users: [
          {},
          {}
        ],
        messages: [],
      },
      params: parseInt(this.props.match.params.id),
      chatInput: ""
    }
  

  componentDidMount() {
    fetch('http://localhost:3000/chats/')
    .then(resp => resp.json())
    .then(chats => {
      const currentChat = chats.find(chat => chat.id === this.state.params)
      this.setState({
        currentChat: currentChat
      })
    })
  }

  postMessage = (chatInput) => {
    let input = {message: {user_id: this.state.currentChat.users[0].id, chat_id: this.state.currentChat.id, content: chatInput}}
    fetch(`http://localhost:3000/messages`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
    .then(resp => resp.json())
    .then(message => this.setState({
      currentChat: {...this.state.currentChat, messages: [...this.state.currentChat.messages, message]}
    }))
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.postMessage(this.state.chatInput)
}

  textChangeHandler = (event) => {
    this.setState({
      chatInput: event.target.value
    })
  }
  
  
  render() {

    const dateTime = (created_at) => {
      return new Date(created_at).toLocaleString('en-US')
    }

    const messages = this.state.currentChat.messages.map(message => {
      const user = this.state.currentChat.users.find(user => user.id === message.user_id)
        return (
          <div key={`message ${message.id}`}>
            <b>{user.name}:</b> <p>{message.content}</p><p>{dateTime(message.created_at)}</p>
          </div>
        )
      }
    )  

    return (
      <div className="container border">
        <div className="row">
          <div className="col mr-auto p-2 border">
            <h3>{this.state.currentChat.users[0].name}</h3>
            <h6>{this.state.currentChat.users[0].location}</h6>
          </div>
          <div className="col-sm-6 border justify-content-center">
            <Link to="/chats/"><button>End Chat</button></Link>
          </div>
          <div className="col p-2 border">
            <h3>{this.state.currentChat.users[1].name}</h3>
            <h6>{this.state.currentChat.users[1].location}</h6>
          </div>
        </div>
        <div className="row mh-50">
          <div className="col"></div>
          <div className="col align-self-stretch border overflow-auto">
            {messages}
            <form className="chat-input" onSubmit={this.submitHandler}>
              <input onChange={this.textChangeHandler} type="text" placeholder="Write a message..."/><button>Send</button>
            </form>
          </div>
          <div className="col"></div>
        </div>
      </div>
    )
  }
}

export default ChatPage