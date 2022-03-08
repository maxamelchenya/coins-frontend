import axios from 'axios';
import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import {API_URL_ALL_COINS_LIST} from "../api/CoinsApiUrls";
import BaseCoinsList from "./BaseCoinsList";


class Catalog extends Component {
  render() {
    return (
      <div>
        <BaseCoinsList
          title="Каталог"
          description="Все выставленные на торги монеты вы можете найти здесь!"
          url={API_URL_ALL_COINS_LIST}
          buttonType="bid"
          buttonLink="#"
        />
      </div>
    );
  }
}

export default withRouter(Catalog)