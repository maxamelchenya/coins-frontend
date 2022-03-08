import React, {Component} from 'react'

class CoinsPriceFiltering extends Component {

  render() {
    return (
      <div>
        <h5>{this.props.title}</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active"
               onClick={() => this.props.unsetFilteringState(this.props.filteringType,)}>
              Все
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active"
               onClick={() => this.props.setFilteringState(this.props.filteringType, [0.00, 10.00])}>
              Меньше 10 BYN
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active"
               onClick={() => this.props.setFilteringState(this.props.filteringType, [10.00, 100.00])}>
              10-100 BYN
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active"
               onClick={() => this.props.setFilteringState(this.props.filteringType, [100.00, 500.00])}>
              100-500 BYN
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active"
               onClick={() => this.props.setFilteringState(this.props.filteringType, [500.00, 1000.00])}>
              500-1000 BYN
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active"
               onClick={() => this.props.setFilteringState(this.props.filteringType, [1000.00, 0.00])}>
              Больше 1000 BYN
            </a>
          </li>
        </ul>
        <hr/>
      </div>
    );
  }
}

export default CoinsPriceFiltering