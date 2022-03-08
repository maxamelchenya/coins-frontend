import React, {Component} from 'react'

class CoinsOrdering extends Component {

  render() {
    return (
      <div>
        <h5>Сортировка</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active"
               onClick={() => this.props.setOrderingState('name', 'asc')}>
              По имени ↑
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="#"
               onClick={() => this.props.setOrderingState('name', 'desc')}>
              По имени ↓
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="#"
               onClick={() => this.props.setOrderingState('year', 'asc')}>
              По году ↑
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="#"
               onClick={() => this.props.setOrderingState('year', 'desc')}>
              По году ↓
            </a>
          </li>
        </ul>
        <hr/>
      </div>
    );
  }
}

export default CoinsOrdering