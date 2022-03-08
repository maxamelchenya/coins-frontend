import axios from 'axios';
import React, {Component} from 'react'
import PageTitle from "../components/PageTitle";
import {API_URL_LOGIN} from "../api/CoinsApiUrls";


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
      loginError: false,
      loginErrorMessage: "",
      loggedIn: !!localStorage.getItem('token'),
    }
  }

  handleLogin = (event, data) => {
    event.preventDefault();
    axios.post(API_URL_LOGIN, JSON.stringify(data))
        .then(response => {
          localStorage.setItem('token', response.data.token);
          console.log(response.data)
          localStorage.setItem('is_superuser', response.data.user.is_superuser);
          this.setState({
            loggedIn: true,
            loginError: false,
            email: response.email
          })
          window.location.href = '/'
        })
        .catch((error) => {
          console.error("LOGIN ERROR", error.message);
          this.setState({
            loggedIn: false,
            loginError: true,
          });
          if (error.response) {
            for (let key in error.response.data) {
              this.setState({
                loginErrorMessage: error.response.data[key][0],
              })
            }
          }
        })
  }
  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  handleEmailChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {

    let errorMessage;
    if (this.state.loginError) {
      errorMessage = <>
        <div className="alert alert-danger" role="alert">
          {this.state.loginErrorMessage}
        </div>
      </>
    }

    return (
        <div>
          <PageTitle
              title="Вход"
              description="Войдите, чтобы начать покупать и продавать!"
          />
          <div className="auction-form">
            <form onSubmit={event => this.handleLogin(event, {
              email: this.state.email,
              password: this.state.password
            })}>
              <div className="form-group form-inline ">
                <label htmlFor="email">Электронная почта</label>
                <input className="form-control" type="email" required
                       onChange={this.handleEmailChange}
                       value={this.state.email}
                       name="email"
                       id="email"/>
              </div>
              <div className="form-group form-inline">
                <label htmlFor="password">Пароль</label>
                <input className="form-control" type="password" required
                       onChange={this.handlePasswordChange}
                       value={this.state.password}
                       name="password"
                       id="password"/>
              </div>
              <div className="form-group form-inline">
                <button className="btn btn-dark btn-margin-top" type='submit'>Войти</button>
              </div>
              {errorMessage}
            </form>
          </div>
        </div>
    )
  }
}

export default Login