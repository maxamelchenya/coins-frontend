import React, {Component} from 'react'

class BlogPost extends Component {

  render() {
    return (
      <div>
        <li>
          <h4  className="float-left">{this.props.title}</h4>
          <h6 className="float-right">{this.props.date}</h6>
          <br/>
          <br/>
          <>{this.props.text}</>
        </li>
      </div>
    );
  }
}

export default BlogPost