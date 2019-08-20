import React from "react";

class Profile extends React.Component {

  componentDidMount() {
    if (!localStorage.getItem("access-token")) {
      return null
    }
  }

  render() {
    if (!localStorage.getItem("access-token")) {
      this.props.history.push("/login")
      return null
    }
    
    return (
      <h2>Profile</h2>
    )
  }
}

export default Profile