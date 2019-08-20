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
    if (!localStorage.getItem("access-token")) {
      return null
    }
    fetch('http://localhost:3000/chats/', {
      headers: {
        "access-token": localStorage.getItem('access-token'),
        uid: localStorage.getItem('uid'),
        expiry: localStorage.getItem('expiry'),
        client: localStorage.getItem('client')
      }
    })
    .then(resp => resp.json())
    .then(chats => {
      const currentChat = chats.find(chat => chat.id === this.state.params)
      this.setState({
        currentChat: currentChat
      })
    })
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  postMessage = (chatInput) => {
    let input = {message: {chat_id: this.state.currentChat.id, content: chatInput}}
    fetch(`http://localhost:3000/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem('access-token'),
        uid: localStorage.getItem('uid'),
        expiry: localStorage.getItem('expiry'),
        client: localStorage.getItem('client')
      },
      body: JSON.stringify(input)
    })
    .then(resp => resp.json())
    .then(message => {
      this.setState({
        currentChat: {...this.state.currentChat, messages: [...this.state.currentChat.messages, message]}
      })
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    if (this.state.chatInput !== "") {
      this.postMessage(this.state.chatInput)
      event.target.reset()
      this.setState({
        chatInput: ""
      })
    }
  }

  textChangeHandler = (event) => {
    this.setState({
      chatInput: event.target.value
    })
  }
  
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({behavior: "smooth"})
  }

  render() {

    if (!localStorage.getItem("access-token")) {
      this.props.history.push("/login")
      return null
    }

    const dateTime = (created_at) => {
      return new Date(created_at).toLocaleString('en-US')
    }

    const messages = this.state.currentChat.messages.map(message => {
      const user = this.state.currentChat.users.find(user => user.id === message.user_id)
      
      if (!user) return <div key={`message ${message.id}`}></div>

      return (
        <div key={`message ${message.id}`}>
          <b>{user.name}:</b> <p>{message.content}</p><p>{dateTime(message.created_at)}</p>
        </div>
      )
    })  

    const { chatInput } = this.state
    const isEnabled = chatInput.length > 0


    return (

        <div className="container border overflow-hidden">
          <div className="row">
            <div className="col-sm-4 mr-auto p-2 border">
              <h3>{this.state.currentChat.users[0].name}</h3>
              <h6>{this.state.currentChat.users[0].location}</h6>
              <img alt="" src={`${this.state.currentChat.users[0].image}?size=100x100`}/>
            </div>
            {(this.state.currentChat.users[0].uid === localStorage.getItem("uid") || this.state.currentChat.users[1].uid === localStorage.getItem("uid")) &&
            <div className="col-sm-4 border text-center">
              <Link to="/chats/"><button className="btn btn-danger">End Chat</button></Link>
            </div>
            }
            <div className="col-sm-4 p-2 border">
              <h3>{this.state.currentChat.users[1].name}</h3>
              <h6>{this.state.currentChat.users[1].location}</h6>
              <img alt="" src={`${this.state.currentChat.users[1].image}?size=100x100`}/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 text-left border overflow-auto" style={{ height: "400px", maxHeight: "400px" }}>
              {messages}
              <div ref={(el) => {this.messagesEnd = el; }}></div>
            </div>
          </div>
          {(this.state.currentChat.users[0].uid === localStorage.getItem("uid") || this.state.currentChat.users[1].uid === localStorage.getItem("uid")) &&
          <div className="row">
            <div className="col-md-12">
              <form className="chat-input" onSubmit={this.submitHandler}>
                <div className="input-group mb-3">
                  <input className="form-control" onChange={this.textChangeHandler} type="text" placeholder="Write a message..." maxLength="115"/>
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-primary" disabled={!isEnabled}>Send</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          }
        </div>
      )
    }
}

export default ChatPage