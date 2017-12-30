import React, { Component } from "react";
import API from "../../../utils/API";

class Panel extends Component {
  // favoriteQuote toggles a quote's favorite status in the db and then
  // reloads all quotes in our app
  /*componentDidMount() {
    console.log(this.props.quote.name,"TEST");
  }*/
  priorityTask(task) {
    API.priorityTask(task).then(this.props.getTasks);
  }
   // deleteQuote deletes a quote in the db and then
  // reloads all quotes in our app
  deleteTask(id) {
    API.deleteTask(id).then(this.props.getTasks);
  }
  render() {
    return (
      <div className="col-md-3 col-sm-6">
        <div className="panel panel-default">
          <div className="panel-body">
            <i
              onClick={() => this.priorityTask(this.props.task)}
              style={styles.priorityStyle}
              className={this.props.task.priority ? "fa fa-star gold" : "fa fa-star-o"}
              aria-hidden="true"
            />
            <i
              onClick={() => this.deleteTask(this.props.task.id)}
              style={styles.deleteStyle}
              className="fa fa-trash-o"
              aria-hidden="true"
            />
            {this.props.task.name}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  priorityStyle: {
    cursor: "pointer",
    marginRight: 5,
    float: "left"
  },
  deleteStyle: {
    cursor: "pointer",
    marginLeft: 5,
    color: "red",
    float: "right"
  }
};

export default Panel;
