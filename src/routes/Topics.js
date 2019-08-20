import React from 'react'
import { Link } from 'react-router-dom'

class Topic extends React.Component {

  state = {
    topics: []
  }

  componentDidMount() {
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
    return (
      <div>
        <h1>Topics</h1>
          <ul className="list-group" style={{ maxWidth: "33%" }}>
            {this.state.topics.map(topic => (
              <li key={`topic id ${topic.id}`} className="list-group-item d-flex justify-content-between align-items-center">
                <Link to={`/topics/${topic.id}`}><b>{topic.name}</b></Link>
              </li>
            ))}
          </ul>
      </div>
    )
  }
}

export default Topic