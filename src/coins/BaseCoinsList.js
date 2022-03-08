import axios from 'axios';
import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import {API_URL_ALL_COINS_LIST, API_URL_COUNTRIES_LIST, API_URL_CATEGORIES_LIST} from "../api/CoinsApiUrls";
import PageTitle from "../components/PageTitle";
import CoinCard from "./CoinCard";
import CoinsOrdering from "./CoinsOrdering";
import CoinsFiltering from "./CoinsFiltering";
import CoinsPriceFiltering from "./CoinsPriceFiltering";


class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      countries: [],
      categories: [],
      orderingParam: "",
      countryName: "",
      categoryName: "",
      maxPrice: "",
      minPrice: "",
      loggedIn: !!localStorage.getItem('token'),
    };
    this.setOrderingState = this.setOrderingState.bind(this);
    this.setFilteringState = this.setFilteringState.bind(this);
    this.unsetFilteringState = this.unsetFilteringState.bind(this);
    this.getCoinsWithParams = this.getCoinsWithParams.bind(this);

  }

  componentDidMount() {
    if (this.state.loggedIn) {
      axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`;
    }
    else {
      axios.defaults.headers.common['Authorization'] = null;
    }
    axios.get(this.props.url).then((response  => {
        this.setState({
          coins: response.data
        })}
    ))
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

  getCoinsWithParams = () => {
    let params = {};
    if (this.state.orderingParam) {
      params['ordering'] = this.state.orderingParam
    }
    if (this.state.countryName) {
      params['country__name'] = this.state.countryName
    }
    if (this.state.categoryName) {
      params['category__name'] = this.state.categoryName
    }
    if (this.state.minPrice) {
      params['min_price'] = this.state.minPrice
    }
    if (this.state.maxPrice) {
      params['max_price'] = this.state.maxPrice
    }
    axios.get(this.props.url, {params}).then((response  => {
        this.setState({
          coins: response.data
        })}
    ))
    console.log(this.state)
  }

  setOrderingState(orderingParam, order) {
    if (order==='desc') {
      orderingParam = '-'+orderingParam
    }
    this.setState({
        orderingParam: orderingParam,
      },
      () => this.getCoinsWithParams()
    );
  }

  setFilteringState(filteringType, filteringCondition) {
    if (filteringType==="Countries" && filteringCondition) {
      this.setState({
          countryName: filteringCondition,
        }, () => this.getCoinsWithParams()
      );}
    if (filteringType==="Categories" && filteringCondition) {
      this.setState({
          categoryName: filteringCondition,
        }, () => this.getCoinsWithParams()
      );}
    if (filteringType==="Price" && filteringCondition) {
      this.setState({
          minPrice: filteringCondition[0],
          maxPrice: filteringCondition[1],
        }, () => this.getCoinsWithParams()
      );}
  }

  unsetFilteringState(filteringType) {
    if (filteringType==="Countries") {
      this.setState({
          countryName: '',
        }, () => this.getCoinsWithParams()
      );}
    if (filteringType==="Categories") {
      this.setState({
          categoryName: '',
        }, () => this.getCoinsWithParams()
      );}
    if (filteringType==="Price") {
      this.setState({
          minPrice: '',
          maxPrice: '',
        }, () => this.getCoinsWithParams()
      );}
  }


  render() {
    return (
      <div>
        <PageTitle
          title={this.props.title}
          description={this.props.description}
        />
        <div className="container">
          <div className="row">
            <div className="col-3 coins-filtering-ordering">
              <div className="row">
                <CoinsOrdering
                  setOrderingState={this.setOrderingState}
                />
              </div>
              <div className="row">
                <CoinsPriceFiltering
                  title="Цена"
                  filteringType="Price"
                  setFilteringState={this.setFilteringState}
                  unsetFilteringState={this.unsetFilteringState}
                />
              </div>
              <div className="row">
                <CoinsFiltering
                  title="Категории"
                  data={this.state.categories}
                  filteringType="Categories"
                  setFilteringState={this.setFilteringState}
                  unsetFilteringState={this.unsetFilteringState}
                />
              </div>
              <div className="row">
                <CoinsFiltering
                  title="Страны"
                  data={this.state.countries}
                  filteringType="Countries"
                  setFilteringState={this.setFilteringState}
                  unsetFilteringState={this.unsetFilteringState}
                />
              </div>
            </div>
            <div className="col-9">
              {this.state.coins.map((coin) => (
                <CoinCard
                  key={coin.id}
                  id={coin.id}
                  owner={coin.user}
                  status={coin.status}
                  category={coin.category}
                  country={coin.country}
                  price={coin.price}
                  name={coin.name}
                  description={coin.description}
                  year={coin.year}
                  end_date={coin.end_date}
                  image={coin.image}
                  buttonType={this.props.buttonType}
                />)
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Catalog)