import React from 'react'

class ChatPage extends React.Component {
  
  poller = null
  state = {
      currentChat: {
        users: [
          {},
          {}
        ],
        messages: [],
        topic: {},
        inactive: false
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

  endChat() {
    let input = {chat: {inactive: true}}

    fetch(`http://localhost:3000/chats/${this.state.params}`, {
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem('access-token'),
        uid: localStorage.getItem('uid'),
        expiry: localStorage.getItem('expiry'),
        client: localStorage.getItem('client')
      },
      method: "PATCH",
      body: JSON.stringify(input)
    }).then(() => this.setState({
      currentChat: {
        ...this.state.currentChat,
        inactive: true
      }
    }))
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
          <div style={{ color: "#B58900", fontSize: "20px" }}>
            <img src={`${user.image}?size=35x35`} alt="" style={{ transform: "rotateY(180deg)"}}/>
            <b>{user.name}</b> <span style={{ fontSize: "10px"}}><em>{dateTime(message.created_at)}</em></span>
          </div>
          <div style={{ padding: "0px 0px 0px 40px"}}>
            <p>{message.content}</p>
          </div>
        </div>
      )
    })  

    const { chatInput } = this.state
    const isEnabled = chatInput.length > 0


    return (

        <div className="container overflow-auto">
          <div className="row border">
            <div className="col text-center border-right mr-auto p-2">
              <h3>{this.state.currentChat.users[1].name}</h3>
              <h6>{this.state.currentChat.users[1].location}</h6>
              <img alt="" src={`${this.state.currentChat.users[1].image}?size=100x100`} style={{ transform: "rotateY(180deg)"}}/>
            </div>
            
            { this.state.currentChat.inactive ? 
            <div className="col align-self-center">
            <div className="text-center">
              <h4><b>{this.state.currentChat.topic.name}</b></h4>
              <h3>Chat Closed</h3>
              </div>
              </div>
            : (this.state.currentChat.users[0].uid === localStorage.getItem("uid")||this.state.currentChat.users[1].uid === localStorage.getItem("uid")) &&
            <div className="col align-self-center">
              <div className="text-center">
                <h4><b>{this.state.currentChat.topic.name}</b></h4>
                <button className="btn btn-danger" onClick={() => this.endChat()}>End Chat</button>
              </div>
            </div>
            }
            
            <div className="col text-center p-2 border-left text-right">
              <h3>{this.state.currentChat.users[0].name}</h3>
              <h6>{this.state.currentChat.users[0].location}</h6>
              <img alt="" src={`${this.state.currentChat.users[0].image}?size=100x100`}/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 text-left border overflow-auto" style={{ height: "400px", maxHeight: "400px", maxWidth: "100%", wordWrap: "break-word", padding: "0px 50px 0px 20px" }}>
              {messages}
              <div ref={(el) => {this.messagesEnd = el; }}></div>
            </div>
          </div>

          { this.state.currentChat.inactive ? 
            <div />
            :
          (this.state.currentChat.users[0].uid === localStorage.getItem("uid") || this.state.currentChat.users[1].uid === localStorage.getItem("uid")) &&
          <div className="row">
            <div className="col-md-12">
              <form className="chat-input" onSubmit={this.submitHandler}>
                <div className="input-group mb-3">
                  <input className="form-control" onChange={this.textChangeHandler} type="text" placeholder="Write a message..." />
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