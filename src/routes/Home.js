import React from "react";
import { Link } from "react-router-dom"

class Home extends React.Component {

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <h5 className="text-center">
            Popular
            </h5>

              <div className="row">
                <div className="col text-center">
                  <Link to="/profile/:id">Shu Azim</Link>
                </div>
                <div className="col text-center">
                  Nicholas Orochena
                </div>
              </div>

              <div className="row">
                <div className="col text-center">
                  Marcus Orochena
                </div>
                <div className="col text-center">
                  Omar Ayyub
                </div>
              </div>

              <div className="row">
                <div className="col text-center">
                  Jenny Ingram
                </div>
                <div className="col text-center">
                  Joseph Arias
                </div>
              </div>

          </div>

          <div className="col-sm">
            <div className="text-center">
            <button>Start</button>
            </div>
          </div>

          <div className="col-sm">
            <h5 className="text-center">Trending</h5>
              <div>
                <ul>
                  <li>Democratic Debates</li><p>Current Parleys: 20</p>
                  <li>Gun Control</li><p>Current Parleys: 17</p>
                  <li>Abortion</li><p>Current Parleys: 14</p>
                </ul>
              </div>
          </div>

        </div>
      </div>
      
      )
  }

}

export default Home
