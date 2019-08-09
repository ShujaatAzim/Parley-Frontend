import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import Profile from "./Profile";
import Login from "./Login";

function AppRouter() {
  return (
    <Router>
      <div className="container">
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="/">PARLEY</a>
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
            </div>
          </nav>
            <Route path="/" exact component={Home} />
            <Route path="/profile/" component={Profile} />
            <Route path="/login/" component={Login} />
        </div>
      </div>
    </Router>
  );
}

export default AppRouter;