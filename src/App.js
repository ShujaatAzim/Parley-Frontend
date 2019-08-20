import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Users from "./routes/Users";
import UserProfile from "./routes/UserProfile";
import Chats from "./routes/Chats";
import ChatPage from "./routes/ChatPage";
import RegisterPage from "./routes/RegisterPage";
import Topics from "./routes/Topics";

// import { generateRequireSignInWrapper } from 'redux-token-auth'
// import { createBrowserHistory } from 'history'

class AppRouter extends React.Component {

  state = {
    loggedInUser: localStorage.getItem("uid")
  }

  logoutUser = () => {
    localStorage.clear()
  }

  render() {

    // const requireSignIn = generateRequireSignInWrapper({
    //   redirectPathIfNotSignedIn: '/login'
    // })

    // const history = createBrowserHistory({})


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
                      <a className="nav-link" href="/users/">Users</a>
                    </li>

                    {localStorage.getItem("access-token") && 
                    <li className="nav-item">
                      <a className="nav-link" onClick={this.logoutUser} href="/login">Logout</a>
                    </li>
                    }
                    
                  </ul>
                  <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                  </form>
                </div>

            </nav>
              <Route path="/" exact component={Home} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/login" exact component={Login} />
              <Route path="/users" exact component={Users} />
              <Route path="/users/:id" exact component={UserProfile} />
              <Route path="/chats" exact component={Chats} />
              <Route path="/chats/:id" exact component={ChatPage} />
              <Route path="/register" exact component={RegisterPage} />
              <Route path="/topics" exact component={Topics} />
          </div>
        </div>
      </Router>
    )
  }
}

export default AppRouter;