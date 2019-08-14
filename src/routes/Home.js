import React from "react";
import { Link } from "react-router-dom"

class Home extends React.Component {

  state = {
    popularUsers: []
  }

  componentDidMount () {
    fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(data => this.setState({
      popularUsers: data.sort((a,b) => b.reputation - a.reputation)
    }))
  }

  render () {
    return (
      <div className="container border">
        <div className="row">
          <div className="col-sm border">
            <h5 className="text-center">Popular</h5>
              <div>
                <ol>
                  {this.state.popularUsers.map(user => (
                    <li key={`user rep ${user.reputation}`}><Link to={`/users/${user.id}`}>{user.name}</Link></li>
                  ))}
                </ol>
              </div>
          </div>

          <div className="col-sm align-self-center">
            <div className="text-center">
              <Link to="/chats/"><button>Start</button></Link>
            </div>
          </div>

          <div className="col-sm border">
            <h5 className="text-center">Trending</h5>
              <div>
                <ul>
                  <li>Democratic Debates</li><p>Parleys: 20</p>
                  <li>Gun Control</li><p>Parleys: 17</p>
                  <li>Abortion</li><p>Parleys: 14</p>
                </ul>
              </div>
          </div>

        </div>
      </div>
      
      )
  }

}

export default Home
