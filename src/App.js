import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import User from "./routes/Users";
import UserProfile from "./routes/UserProfile"
import Chats from "./routes/Chats"
import ChatPage from "./routes/ChatPage";

function AppRouter() {
  return (
    <Router>
      <div className="container">
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">PARLEY</a>
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
            <Route path="/profile/" exact component={Profile} />
            <Route path="/login/" exact component={Login} />
            <Route path="/users/" exact component={User} />
            <Route path="/users/:id" exact component={UserProfile} />
            <Route path="/chats/" exact component={Chats} />
            <Route path="/chats/:id" exact component={ChatPage} />
        </div>
      </div>
    </Router>
  );
}

export default AppRouter;