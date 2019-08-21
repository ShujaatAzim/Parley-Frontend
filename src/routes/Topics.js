import React from 'react'
import { Link } from 'react-router-dom'

class Topic extends React.Component {

  state = {
    topics: []
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
    .then(data => this.setState({
      topics: data
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
          <h1>Topics</h1>
        </div>
        <div className="row">
          <div className="col text-left overflow-auto" style={{ height: "auto", maxHeight: "500px", width: "auto", maxWidth: "400px"}}>
            <ul className="list-group" style={{ maxWidth: "100%" }}>
              {this.state.topics.map(topic => (
                <li key={`topic id ${topic.id}`} className="list-group-item d-flex justify-content-between align-items-center">
                  <Link to={`/topics/${topic.id}`}><b>{topic.name}</b></Link>
                  <span className="badge badge-primary badge-pill">Current Parleys: {`${topic.chats.length}`}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col text-left overflow-auto">
            Info about topics. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque auctor, enim at hendrerit blandit, nisi sapien 
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

export default Topic