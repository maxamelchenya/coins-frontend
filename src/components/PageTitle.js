import React, {Component} from 'react'


class PageTitle extends Component {

  render() {
    return (
      <section id="PageTitle">
        <div className="container">
          <div>
            <h2>{this.props.title}</h2>
            <hr/>
            <h5>{this.props.description}</h5>
          </div>
        </div>
      </section>
    );
  }
}

export default PageTitle