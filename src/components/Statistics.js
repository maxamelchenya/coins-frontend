import axios from 'axios';
import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import {API_URL_USER_CREATION_STATISTIC} from "../api/CoinsApiUrls";
import PageTitle from "../components/PageTitle";
import Chart from 'chart.js/auto'

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_creation_statistic: [],
      users: [],
      months: []
    };

  }

  componentDidMount() {
    axios.get(API_URL_USER_CREATION_STATISTIC, {
      headers: {
        Authorization: "Token " + localStorage.getItem('token'),
        'content-type': 'multipart/form-data'
      }}).then((response  => {
        this.setState({
            user_creation_statistic: response.data
          },  () =>
            this.createDataset()
        )}
    ))
  }

  createDataset() {
    let data = this.state.user_creation_statistic
    let months = Object.keys(data).map((month_data) => data[month_data]["month"]);
    let users = Object.keys(data).map((month_data) => data[month_data]["id__count"]);
     this.setState({
            users: users,
            months: months
     }, () =>
            this.createChart()
     )}

  createChart() {
    console.log(this.state)
    var name = document.getElementById("doughnutChart").getContext('2d');
    var myPolarChart = new Chart(name, {
      type: 'doughnut',
      data: {
        labels: this.state.months,
        datasets: [{
          data: this.state.users,
          backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#E6E6FA", "#BC8F8F",  "#4D5360", "#F0E68C", "#20B2AA", "#6A5ACD", "#D8BFD8", "#FFB6C1"],
          hoverBackgroundColor: ["#C0C0C0"]
        }]
      },
      options: {
        responsive: true
      }
    });
  }
  render() {
    return (
      <div>
        <PageTitle
          title="Статистика"
          description="Отчет о числе зарегистрированных пользователей в месяц."
        />
        <div className="user-creation-statistic">
          <canvas id="doughnutChart">/</canvas>
        </div>
      </div>
    );
  }
}

export default withRouter(Statistics)