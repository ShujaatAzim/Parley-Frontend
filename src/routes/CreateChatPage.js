import React from 'react'

class CreateChatPage extends React.Component {

  state = {
    loggedInUser: localStorage.getItem("uid"),
    currentUser: {},
    allTopics: [],
    input: 1
  }

  componentDidMount() {
    if (!localStorage.getItem("access-token")) {
      return null
    }
    fetch("http://localhost:3000/topics", {
      headers: {
        "access-token": localStorage.getItem('access-token'),
        uid: localStorage.getItem('uid'),
        expiry: localStorage.getItem('expiry'),
        client: localStorage.getItem('client')
      }
    })
    .then(resp => resp.json())
    .then(topics => this.setState({
      allTopics: topics
    }))
    fetch('http://localhost:3000/users', {
      headers: {
        "access-token": localStorage.getItem('access-token'),
        uid: localStorage.getItem('uid'),
        expiry: localStorage.getItem('expiry'),
        client: localStorage.getItem('client')
      }
    })
    .then(resp => resp.json())
    .then(users => {
      const currentUser = users.find(user => user.email === this.state.loggedInUser)
      console.log(currentUser)
      this.setState({
        currentUser: currentUser
      })
    })
  }


  createChat = () => {
    fetch("http://localhost:3000/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem('access-token'),
        uid: localStorage.getItem('uid'),
        expiry: localStorage.getItem('expiry'),
        client: localStorage.getItem('client')
      },
      body: JSON.stringify({topic: this.state.input, user_id: this.state.currentUser.id})
    })
    .then(resp => resp.json())
    .then(chat => this.props.history.push(`/chats/${chat.id}`))
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.createChat()
  }

  onDropChange = (event) => {
    this.setState({
      input: event.target.value
    }, () => console.log(this.state.input))
  }

  render() {
    if (!localStorage.getItem("access-token")) {
      this.props.history.push("/login")
      return null
    }
    return (
      <div>
        <form>
          <div className="form-group" style={{ maxWidth: "50%" }}>
            <label>Select a Parley Topic</label>
            <select className="form-control" onChange={this.onDropChange}>
              {this.state.allTopics.map(topic => (
                <option key={`${this.state.loggedInUser}${topic.id}`} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>
        </form>
        <button className="btn btn-primary" onClick={this.createChat}>Create Parley!</button>
      </div>
    )
  }
}

export default CreateChatPage