import React from 'react'
import { Link } from 'react-router-dom'

class LandingPage extends React.Component {
  render() {
    return (
      <div className="col align-self-center">
        <div className="text-center">
          <p style={{ fontSize: "260px", fontFamily: "Luminari" }}>PARLEY</p>
          <small>by Shujaat Azim</small>
          <br /><br />
          <div className="col align-self-center">
            <div className="text-center">
              <Link to="/chats"><button className="btn btn-primary" style={{ padding: "0px 15px"}}>Login</button></Link><span>     </span>
              <Link to="/about"><button className="btn btn-primary" style={{ padding: "0px 15px"}}>About Parley</button></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage