import React from 'react'
import { Link } from 'react-router-dom'

class ChatPage extends React.Component {
  
  poller = null
  state = {
      currentChat: {
        users: [
          {},
          {}
        ],
        messages: [],
        topic: {}
      },
      params: parseInt(this.props.match.params.id),
      chatInput: ""
    }

  fetchChat() {
    if (!localStorage.getItem("access-token")) {
      return null
    }
    fetch(`http://localhost:3000/chats/${this.state.params}`, {
      headers: {
        "access-token": localStorage.getItem('access-token'),
        uid: localStorage.getItem('uid'),
        expiry: localStorage.getItem('expiry'),
        client: localStorage.getItem('client')
      }
    })
    .then(resp => resp.json())
    .then(currentChat => {
      this.setState({
        currentChat: currentChat
      })
    })
  }
  

  componentDidMount() {
    this.fetchChat();

    this.poller = setInterval(() => {
      this.poll();
    }, 3000);
    
  }

  componentWillUnmount() {
    clearInterval(this.poller)
  }

  poll() {
    this.fetchChat()
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
        <div key={`message ${message.id}`} style={{ fontSize: "20px"}}>
          <img src={`${user.image}?size=25x25`} alt="" style={{ transform: "rotateY(180deg)"}}/>
          <div style={{ color: "#B58900" }}>
            <b><em>{user.name}</em></b>
          </div>
          <div>
            <p>{message.content}</p><p>{dateTime(message.created_at)}</p>
          </div>
        </div>
      )
    })  

    const { chatInput } = this.state
    const isEnabled = chatInput.length > 0


    return (

        <div className="container border overflow-auto">
          <div className="row">
            <div className="col mr-auto p-2 border">
              <h3>{this.state.currentChat.users[0].name}</h3>
              <h6>{this.state.currentChat.users[0].location}</h6>
              <img alt="" src={`${this.state.currentChat.users[0].image}?size=100x100`} style={{ transform: "rotateY(180deg)"}}/>
            </div>
            {(this.state.currentChat.users[0].uid === localStorage.getItem("uid")||this.state.currentChat.users[1].uid === localStorage.getItem("uid")) &&
            <div className="col align-self-center">
              <div className="text-center">
                <h4>{this.state.currentChat.topic.name}</h4>
                <Link to="/chats/"><button className="btn btn-danger">End Chat</button></Link>
              </div>
            </div>
            }
            <div className="col p-2 border text-right">
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