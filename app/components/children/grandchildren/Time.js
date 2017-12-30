import React, { Component } from "react";
import API from "../../../utils/API";

class Times extends Component {

  render() {
    return (
      <div className="col-sm-12">
        <div className="panel panel-default">
          <div className="panel-body">
            {this.props.title}: {this.props.time}
          </div>
        </div>
      </div>
    );
  }
}

export default Times;