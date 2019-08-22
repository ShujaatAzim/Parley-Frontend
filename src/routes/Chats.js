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
      <div className="container">
        <div className="row">
          <h1>Parleys</h1>
        </div>
        <div>
          <Link to="/createchat"><button className="btn btn-primary">New Parley</button></Link>
        </div>
        <br />
        <div className="row">
          <div className="col text-left overflow-auto" style={{ height: "auto", maxHeight: "400px", width: "auto", maxWidth: "550px"}}>
            <ul className="list-group" style={{ maxWidth: "100%" }}>
              {this.state.allChats.map(chat => 
                <li className="list-group-item d-flex justify-content-between align-items-center" 
                  key={`chat ${chat.id}`}><Link to={`/chats/${chat.id}`}>
                  <b>{chat.topic.name}</b></Link> <b><Link to={`/users/${chat.users[0].id}`}>{chat.users[0].name}</Link> & 
                  <Link to={`/users/${chat.users[1].id}`}> {chat.users[1].name}</Link></b>
                </li>
              )}
            </ul>
          </div>
          <div className="col text-left overflow-auto">
            Info about chats. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque auctor, enim at hendrerit blandit, nisi sapien 
            dignissim ipsum, sed rutrum nunc risus a arcu. Fusce imperdiet eu leo ac rutrum. Vestibulum ante ipsum primis in faucibus orci luctus 
            et ultrices posuere cubilia Curae; Vestibulum mollis efficitur risus at fermentum. In in nisi nec nulla malesuada consequat vel sit amet 
            magna. Maecenas dapibus tortor at suscipit mollis. Donec maximus augue at felis euismod aliquam. Praesent quis finibus metus. Sed id 
            felis pulvinar, congue velit et, semper neque. Vivamus ultrices mi eget dolor aliquet, nec posuere sapien iaculis. Nam id lacinia est, 
            ut mattis quam. Aenean tincidunt nunc sed neque laoreet, sed feugiat dui placerat. Nulla quam lacus, imperdiet quis bibendum eu, commodo ac 
            orci. Praesent nec placerat libero.
        </div>
        </div>
      </div>
    )
  }
}

export default Chats