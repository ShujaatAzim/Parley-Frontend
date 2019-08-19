import React from "react";
import { Link } from "react-router-dom"

class Home extends React.Component {

  state = {
    popularUsers: [],
    trendingTopics: [],
    ongoingChats: {}
  }

  componentDidMount () {
    fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(users => this.setState({
      popularUsers: users.sort((a,b) => b.reputation - a.reputation)
    }))

    fetch('http://localhost:3000/topics')
    .then(resp => resp.json())
    .then(topics => this.setState({
      trendingTopics: topics
    }))

    fetch('http://localhost:3000/chats')
    .then(resp => resp.json())
    .then(chats => {
      let copyOngoing = {...this.state.ongoingChats}
      chats.forEach(chat => {
        if (copyOngoing[chat.topic_id]) {
          copyOngoing[chat.topic_id] += 1
        } else {
          copyOngoing[chat.topic_id] = 1
        }
      })
      console.log(copyOngoing)
      this.setState({
        ongoingChats: copyOngoing
      })
    })
  }

  render () {
    return (
      <div className="container border">
        <div className="row">
          <div className="col-sm border">
            <h5 className="text-center">Popular Parleyers</h5>
              <div>
                <ol className="list-group">
                  {this.state.popularUsers.map(user => (
                    <li key={`user rep ${user.reputation}`} className="list-group-item d-flex justify-content-between align-items-center">
                      <Link to={`/users/${user.id}`}><b>{user.name}</b></Link>
                      <span className="badge badge-primary badge-pill">Likes: {`${user.reputation}`}</span>
                    </li>
                  ))}
                </ol>
              </div>
          </div>

          <div className="col-sm align-self-center">
            <div className="text-center">
              <Link to="/chats/"><button className="btn btn-primary">Start</button></Link>
            </div>
          </div>

          <div className="col-sm border">
            <h5 className="text-center">Trending Topics</h5>
              <div>
                <ul className="list-group">
                  {this.state.trendingTopics.map(topic => (
                    <li key={`topic id ${topic.id}`} className="list-group-item d-flex justify-content-between align-items-center">
                      <Link to={`/topic/${topic.id}`}><b>{topic.name}</b></Link>
                      <span className="badge badge-primary badge-pill">Parleys: {`${this.state.ongoingChats[topic.id]}`}</span>
                    </li>
                  ))}
                </ul>
              </div>
          </div>

        </div>
      </div>
      
      )
  }

}

export default Home
