import React from "react";

class Profile extends React.Component {

  state = {
    loggedInUser: localStorage.getItem("uid"),
    currentUser: {}
  }

  componentDidMount() {
    if (!localStorage.getItem("access-token")) {
      return null
    }
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
      // <div>
      //   <h2>{this.state.currentUser.name}</h2>
      //   <div>
      //     <img src={`${this.state.currentUser.image}?size=150x150`} alt=""/>
      //   </div>
      //   <div>
      //     Age: {this.state.currentUser.age} Years
      //   </div>
      //   <div>
      //     Location: {this.state.currentUser.location}
      //   </div>
      // </div>
    )
  }
}

export default Profile