import React, {Component} from 'react'
import { BrowserRouter } from 'react-router-dom';
import Nav from "./Nav";
import Main from "./Main";
import Blog from "./Blog";
import Contacts from "./Contacts";
import Statistics from "./Statistics";
import Catalog from "../coins/Catalog";
import MyCoins from "../coins/MyCoins";
import Login from "../accounts/Login";
import Registration from "../accounts/Registration";
import {Route} from "react-router-dom";
import AddCoin from "../coins/AddCoin";


class BaseLayout extends Component {

  render() {

    return (
      <div className="box">
        <div className="header">
          <Nav/>
        </div>
        <div className="content">
          <BrowserRouter>
            <Route path="/" exact component={Main}/>
            <Route path="/contacts/" exact component={Contacts}/>
            <Route path="/blog/" exact component={Blog}/>
            <Route path="/catalog/" render={() => <Catalog/>}/>
            <Route path="/login/" render={() => <Login/>}/>
            <Route path="/registration/" render={() => <Registration/>}/>
            <Route path="/my-coins/" render={() => <MyCoins/>}/>
            <Route path="/add-coin/" render={() => <AddCoin/>}/>
            <Route path="/statistics/" render={() => <Statistics/>}/>
          </BrowserRouter>
        </div>
        <div className="footer">
          <footer id="footer">
            <div className="copyright-content">
              <div className="container">
                <div className="copyright-text text-center"> 2022 Аукциончик - Responsive Multi-Purpose
                  HTML5 Template. All Rights Reserved.</div>
              </div>
            </div>
          </footer>
        </div>
      </div>

    );
  }
}

export default BaseLayout