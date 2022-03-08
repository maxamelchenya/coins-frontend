import axios from 'axios';
import React, {Component} from 'react'
import PageTitle from "../components/PageTitle";
import { API_URL_SIGNUP} from "../api/CoinsApiUrls";


axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

class Registration extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      registrationError: false,
      registrationErrorMessage: ""
    }
  }
  checkPasswords = () => {
    if (this.state.password!== this.state.password2) {
      this.setState({
        registrationError: true,
        registrationErrorMessage: "Вы ввели разные пароли!",
      })
      console.log('here')
      return false
    } else {
      return true
    }
  }

  handleRegistration = (event, data) => {
    event.preventDefault();
    if (this.checkPasswords()) {
      axios.post(API_URL_SIGNUP, JSON.stringify(data))
          .then(response => {
            window.location.href = '/login'
          })
          .catch(error => {
            this.setState({
              registrationError: true,
            })
            if (error.response) {
              for (let key in error.response.data) {
                this.setState({
                  registrationErrorMessage: error.response.data[key][0],
                })
              }
            }
          })
    }
  }

  changeHandler = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    let errorMessage;
    if (this.state.registrationError) {
      errorMessage = <>
        <div className="alert alert-danger" role="alert">
          {this.state.registrationErrorMessage}
        </div>
      </>
    }
    return (
        <div>
          <PageTitle
              title="Регистрация"
              description="Зарегистрируйтесь, чтобы начать покупать и продавать!"
          />
          <div className="auction-form">
            <form onSubmit={event => this.handleRegistration(event, {
              email: this.state.email,
              username: this.state.username,
              password: this.state.password,
            })}>
              <div className="form-group form-inline">
                <label htmlFor="email">Электронная почта</label>
                <input className="form-control" type="email" required
                       onChange={this.changeHandler}
                       value={this.state.email}
                       name="email"
                       id="email"/>
              </div>
              <div className="form-group form-inline">
                <label htmlFor="username">Имя</label>
                <input className="form-control" type="text" required
                       onChange={this.changeHandler}
                       value={this.state.username}
                       name="username"
                       id="username"/>
              </div>
              <div className="form-group form-inline">
                <label htmlFor="password">Пароль</label>
                <input className="form-control" type="password" minLength="8" required
                       onChange={this.changeHandler}
                       value={this.state.password}
                       name="password"
                       id="password"/>
              </div>
              <div className="form-group form-inline">
                <label htmlFor="password2">Повторите пароль</label>
                <input className="form-control" type="password" minLength="8" required
                       onChange={this.changeHandler}
                       value={this.state.password2}
                       name="password2"
                       id="password2"/>
              </div>
              <div className="form-group form-inline">
                <button className="btn btn-dark btn-margin-top" type='submit'>Зарегистрироваться</button>
              </div>
              {errorMessage}
            </form>
          </div>
        </div>
    )
  }
}
export default Registration