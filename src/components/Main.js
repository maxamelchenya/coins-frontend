import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import background from "../img/main.jpg";


class Main extends Component {

  render() {

    return (
      <div className="main-container">
        <div id="mainLabel">
          <h4>денежный аукцион</h4>
          <hr/>
          <h3>Aукциончик</h3>
        </div>
      </div>
    );
  }
}

export default withRouter(Main)