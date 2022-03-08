import axios from 'axios';
import React, {Component} from 'react'
import PageTitle from "../components/PageTitle";
import {API_URL_ADD_COIN, API_URL_CATEGORIES_LIST, API_URL_COUNTRIES_LIST} from "../api/CoinsApiUrls";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


class Registration extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      price: '',
      year: '',
      description: '',
      category: null,
      country: null,
      category_name: '',
      country_name: '',
      message: '',
      image: '',
      countries: [],
      categories: [],
    }
  }
  componentDidMount() {
    axios.get(API_URL_COUNTRIES_LIST).then((response  => {
        this.setState({
          countries: response.data
        })}
    ))
    axios.get(API_URL_CATEGORIES_LIST).then((response  => {
        this.setState({
          categories: response.data
        })}
    ))
  }

  handleCoinAdd = (event, data) => {
    event.preventDefault();
    let form_data = new FormData()
    form_data.append("name", this.state.name)
    form_data.append("price", this.state.price)
    form_data.append("year", this.state.year)
    form_data.append("description", this.state.description)
    form_data.append("category", this.state.category)
    form_data.append("country", this.state.country)
    form_data.append("image", this.state.image)
    axios.post(API_URL_ADD_COIN, form_data, {
      headers: {
        Authorization: "Token " + localStorage.getItem('token'),
        'content-type': 'multipart/form-data'
      },
    })
      .then(response => {
        this.setState({
          message: 'Монета успешно добавлена!'
        })
      })
      .catch(error => {
        console.log(error.response.data)
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
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value,
    })
    console.log(this.state)
  }

  countryChangeHandler = (country) => {
    this.setState({
      country: country.id,
      country_name: country.name,
    })
  }
  categoryChangeHandler = (category) => {
    this.setState({
      category: category.id,
      category_name: category.name,
    })
  }
  handleImageChange = (event) => {
    this.setState({
      image: event.target.files[0]
    })
  };

  render() {
    let message;
    if (this.state.message) {
      message = <>
        <div className="alert alert-dark" role="alert">
          {this.state.message}
        </div>
      </>
    }
    return (
      <div>
        <PageTitle
          title="Добавить монету"
          description="Тут вы можете добавить монету, чтобы после выставить на торги!"
        />
        <div className="auction-form add-coin-form">
          <form onSubmit={event => this.handleCoinAdd(event, {
            name: this.state.name,
            price: this.state.price,
            year: this.state.year,
            description: this.state.description,
            category: this.state.category,
            country: this.state.country,
            image: this.state.image,
          })}>
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="form-group form-inline">
                    <label htmlFor="name">Имя</label>
                    <input className="form-control" type="text" required
                           onChange={this.changeHandler}
                           value={this.state.name}
                           name="name"
                           id="name"/>
                  </div>
                  <div className="form-group form-inline">
                    <label htmlFor="price">Цена</label>
                    <input className="form-control" type="number" step="0.01" required
                           onChange={this.changeHandler}
                           value={this.state.price}
                           name="price"
                           id="price"/>
                  </div>
                  <div className="form-group form-inline">
                    <label htmlFor="year">Год чеканки</label>
                    <input className="form-control" type="number" min="0" required
                           onChange={this.changeHandler}
                           value={this.state.year}
                           name="year"
                           id="year"/>
                  </div>
                  <div className="form-group form-inline">
                    <label htmlFor="description">Описание</label>
                    <textarea className="form-control"
                              onChange={this.changeHandler}
                              value={this.state.description}
                              name="description"
                              id="description"/>
                  </div>
                </div>

                <div className="col">
                  <div className="input-group form-inline ">
                    <label htmlFor="country">Страна</label>
                    <input type="text" className="form-control" required
                           value={this.state.country_name}
                           name="country"
                           id="country"
                           aria-label="Text input with dropdown button"/>
                    <div className="input-group-append">
                      <button className="btn btn-dark dropdown-toggle btn-add-coin-form" type="button" data-toggle="dropdown"
                              aria-haspopup="true" aria-expanded="false">Dropdown
                      </button>
                      <div className="dropdown-menu">
                        {this.state.countries.map((country) => (
                          <a className="nav-link active"
                             onClick={() =>  this.countryChangeHandler(country)}>
                            {country.name}
                          </a>)
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="input-group form-inline add-coin-dropdown" >
                    <label htmlFor="category">Категория</label>
                    <input type="text" className="form-control" required
                           value={this.state.category_name}
                           name="category"
                           id="category"
                           aria-label="Text input with dropdown button"/>
                    <div className="input-group-append">
                      <button className="btn btn-dark dropdown-toggle btn-add-coin-form" type="button" data-toggle="dropdown"
                              aria-haspopup="true" aria-expanded="false">Dropdown
                      </button>
                      <div className="dropdown-menu">
                        {this.state.categories.map((category) => (
                          <a className="nav-link active"
                             onClick={() =>  this.categoryChangeHandler(category)}>
                            {category.name}
                          </a>)
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group form-inline">
                    <label htmlFor="image">Фотография монеты</label>
                    <input type="file"
                           className="form-control "
                           onChange={this.handleImageChange}
                           name="image"
                           id="image"/>
                  </div>
                  <div className="form-group form-inline">
                    <button className="btn btn-dark btn-margin-top" type='submit'>Добавить монету</button>
                  </div>
                </div>
              </div>
            </div>
                {message}
          </form>
        </div>
      </div>
    )
  }
}
export default Registration