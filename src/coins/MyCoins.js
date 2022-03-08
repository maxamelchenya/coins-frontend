import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import {API_URL_MY_COINS} from "../api/CoinsApiUrls";
import BaseCoinsList from "./BaseCoinsList";
import {Redirect} from "react-router";



class MyCoins extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: !!localStorage.getItem('token'),
    }
  }

  render() {
    return (
      <div>
        <BaseCoinsList
          title="Мои монеты"
          description="Все ваши монеты вы можете найти здесь!"
          url={API_URL_MY_COINS}
          buttonType="putUp"
          buttonLink="#"
        />
        {this.state.loggedIn ?<></> :<Redirect to='/'/>}
      </div>
    );
  }
}

export default withRouter(MyCoins)