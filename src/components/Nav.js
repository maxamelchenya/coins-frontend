import React, {Component} from 'react'
import {withRouter} from "react-router-dom";


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: !!localStorage.getItem('token'),
      isSuperuser: localStorage.getItem('is_superuser'),
    };
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_superuser');
    this.setState({loggedIn: false, username: null})
    window.location.href = "/login"
  }
  render() {

    const loggedOutNav = (
      <>
        <li className="nav-item">
          <a className="nav-link" href="/login/">Вход</a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="/registration/">Регистрация</a>
        </li>
      </>);

    const loggedInNav = (
      <>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={this.handleLogout} >Выход</a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="/my-coins/">Мои монеты</a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="/add-coin/">Добавить монету</a>
        </li>
      </>);
    const superuserNav = (
      <>
        <li className="nav-item">
          <a className="nav-link" href="/statistics/">Статистика</a>
        </li>
      </>);

    return (
      <div>

        <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">

          <a className="navbar-brand" href="/">
            <h3><b>Аукциончик</b></h3>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse"
                  data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Left Side Of Navbar */}
            <ul className="navbar-nav mr-auto">

            </ul>

            {/*  Right Side Of Navbar */}
            <ul className="navbar-nav ml-auto">

              <li className="nav-item">
                <a className="nav-link" href="/contacts/">Контакты</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/blog/">Блог</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/catalog/">Каталог</a>
              </li>

              {this.state.loggedIn ? loggedInNav : loggedOutNav}
              {this.state.isSuperuser==='true'? superuserNav : <></>}
            </ul>

          </div>
        </nav>
      </div>

    );
  }
}

export default Nav