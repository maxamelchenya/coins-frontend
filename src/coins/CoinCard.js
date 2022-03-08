import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import {API_URL_BID_COIN, API_URL_MY_COINS} from "../api/CoinsApiUrls";
import axios from "axios";


class CoinCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      status: null,
      loggedIn: !!localStorage.getItem('token'),
      message: '',
      bid: null,
      price: null,
      showBidForm: false
    }
  }
  componentDidMount() {

    this.setState({
      status: this.props.status,
      price: this.props.price
    });
  }
  putUpCoinForSale = (event) => {
    event.preventDefault()
    axios.post(`${API_URL_MY_COINS}${this.state.id}/put_up_for_sale/`, {},
      {headers: {
          Authorization: "Token " + localStorage.getItem('token')
        }}
    ).then((result) => {
      this.setState({
        status: result.data.status,
        message: "Монета выставлена на торги!"
      })
    })
      .catch((error) => {
        if (error.response) {
          for (let key in error.response.data) {
            this.setState({
              message: error.response.data[key][0],
            })
          }
        }
      })
  }

  showBidForm = () => {
    this.setState({
      showBidForm: true
    })
  }

  bidCoin = (event) => {
    event.preventDefault()
    axios.patch(`${API_URL_BID_COIN}${this.state.id}/`, {"price": this.state.bid},
      {headers: {
          Authorization: "Token " + localStorage.getItem('token')
        }}
    ).then((result) => {
      this.setState({
        price: result.data.price,
        message: "Ставка успешно сделана!",
        showBidForm: false
      })
    })
      .catch((error) => {
        if (error.response) {
          for (let key in error.response.data) {
            this.setState({
              message: error.response.data[key][0],
            })
          }
        }
      })
  }

  changeHandler = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {

    let bidForm;
    if (this.state.showBidForm) {
      bidForm =
        <div className="row bid-form">
          <form onSubmit={event => this.bidCoin(event, {
            bid: this.state.bid,
          })}>
            <div className="form-group form-inline ">
              <label htmlFor="bid">Ставка:</label>
              <input className="form-control" type="number" step="0.01" required
                     onChange={this.changeHandler}
                     value={this.state.bid}
                     name="bid"
                     id="bid"/>
              <button className="btn btn-dark btn-margin-top" type='submit'>Поставить!</button>
            </div>
          </form>
        </div>
    }

    let message;
    if (this.state.message) {
      message = <>
        <div className="row">
          <div className="alert alert-dark" role="alert">
            {this.state.message}
          </div>
        </div>
      </>
    }

    let button;
    if (this.props.buttonType==="bid") {
      button = <>
        <button type="button" className="btn btn-dark"
                onClick={this.showBidForm}>Сделать ставку!
        </button>
      </>
    } else if (this.props.buttonType==="putUp" && this.state.status==='Pending') {
      button = <>
        <button type="button" className="btn btn-dark"
                onClick={this.putUpCoinForSale}>Выставить на торги!</button>
      </>
    }
    return (
      <div>
        <div className="coin-card">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="coin-image-card">
                  <img alt="монета" src={this.props.image}/>
                </div>
                {this.state.loggedIn ?
                  button
                  :<></>}
              </div>
              <div className="col coin-card-data">
                <h5>Название: {this.props.name}</h5>
                <p>Цена: {this.state.price} BYN</p>
                <p>Статус: {this.state.status}</p>
                <p>Владелец: {this.props.owner}</p>
                <p>Категория: {this.props.category}</p>
                <p>Страна: {this.props.country}</p>
                <p>Год: {this.props.year}</p>
                <p>Окончание торгов: {this.props.end_date}</p>
                <p>Описание: {this.props.description}</p>
              </div>
            </div>

            {bidForm}
            {message}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CoinCard)