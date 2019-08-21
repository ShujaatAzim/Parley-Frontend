import React from 'react'

class UserProfile extends React.Component {

  state = {
    currentUser: {},
    params: parseInt(this.props.match.params.id)
  }

  componentDidMount() {
    if (!localStorage.getItem("access-token")) {
      return null
    }
    fetch('http://localhost:3000/users/', {
      headers: {
        "access-token": localStorage.getItem('access-token'),
         uid: localStorage.getItem('uid'),
         expiry: localStorage.getItem('expiry'),
         client: localStorage.getItem('client'),
       }
    })
    .then(resp => resp.json())
    .then(users => {
      const currentUser = users.find(user => user.id === this.state.params)
      this.setState({
        currentUser: currentUser
      })
    })
  }

  render() {
    if (!localStorage.getItem("access-token")) {
      this.props.history.push("/login")
      return null
    }
    return (
      <div className="card" style= {{width: "16rem"}}>
        <img className="card-img-top" src={`${this.state.currentUser.image}?size=200x200`} alt="" />
        <div className="card-body">
          <h4 className="card-title"><b>{this.state.currentUser.name}</b></h4>
          <p className="card-text">Small blurb made by user, eventually.</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Location: {this.state.currentUser.location}</li>
          <li className="list-group-item">Age: {this.state.currentUser.age}</li>
          <li className="list-group-item">Rep: {this.state.currentUser.reputation}</li>
        </ul>
      </div>
    )
  }
}

export default UserProfile