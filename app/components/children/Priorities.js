import React, { Component } from "react";
import Panel from "./grandchildren/Panel";
import API from "../../utils/API";

class Priorities extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    };
    // Binding getQuotes to this component since we'll be passing this method to 
    // other components to use
    this.getTasks = this.getTasks.bind(this);
  }
  // Getting all quotes once the component has mounted
  componentDidMount() {
    this.getTasks();
  }
  getTasks() {
    API.getTasks().then((res) => {
      const priorityTasks = res.data.filter(task => task.priority);
      this.setState({ tasks: priorityTasks });
      // console.log(this.state.quotes);
    });
  }
  // A helper method for rendering one panel for each quote
  renderTasks() {
    return this.state.tasks.map(task => (
      <Panel
        task={task}
        key={task.id}
        getTasks={this.getTasks}
      />
    ));
  }
  render() {
    return (
      <div className="container">
        <div className="jumbotron text-center">
          <h1>Priority Tasks</h1>
          <p>Your most urgent tasks.</p>
        </div>
        <div className="row">
          <hr />
          {this.renderTasks()}
        </div>
      </div>
    );
  }
}

export default Priorities;
