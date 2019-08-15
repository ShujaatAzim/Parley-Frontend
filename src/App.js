import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import User from "./routes/Users";
import UserProfile from "./routes/UserProfile"
import Chats from "./routes/Chats"
import ChatPage from "./routes/ChatPage";

class AppRouter extends React.Component {

  state = {
    loggedInUser: null
  }

  render() {
    return (
      <Router>
        <div className="container">
          <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/"><b>PARLEY</b></a>
              <div className="row">
                <div className="col">
                  <Link to="/"><button>Home</button></Link>
                </div>
                <div className="col">
                  <Link to="/profile/"><button>Profile</button></Link>
                </div>
                <div className="col">
                  <Link to="/login/"><button>Login</button></Link>
                </div>
                <div className="col">
                  <Link to="/users/"><button>Users</button></Link>
                </div>
              </div>
            </nav>
              <Route path="/" exact component={Home} />
              <Route path="/profile/" exact render={(props)=>(<Profile {...props} loggedInUser={this.state.loggedInUser}/>)} />
              <Route path="/login/" exact render={(props)=>(<Login {...props} loggedInUser={this.state.loggedInUser}/>)} />
              <Route path="/users/" exact render={(props)=>(<User {...props} loggedInUser={this.state.loggedInUser}/>)} />
              <Route path="/users/:id" exact render={(props)=>(<UserProfile {...props} loggedInUser={this.state.loggedInUser}/>)} />
              <Route path="/chats/" exact render={(props)=>(<Chats {...props} loggedInUser={this.state.loggedInUser}/>)} />
              <Route path="/chats/:id" exact render={(props)=>(<ChatPage {...props} loggedInUser={this.state.loggedInUser}/>)} />
          </div>
        </div>
      </Router>
    )
  }
}

export default AppRouter;