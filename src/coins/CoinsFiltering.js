import React, {Component} from 'react'

class CoinsFiltering extends Component {

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
          {this.props.data.map((item) => (
            <li className="nav-item">
              <a className="nav-link active"
                 onClick={() => this.props.setFilteringState(this.props.filteringType, item.name)}>
                {item.name}
              </a>
            </li>)
          )}
        </ul>
        <hr/>
      </div>
    );
  }
}

export default CoinsFiltering