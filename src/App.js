import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
              <a className="navbar-brand" href="/">PARLEY</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/profile/">Profile</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/login/">Login</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/users/">Users</a>
                    </li>
                  </ul>
                  <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
                  </form>
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