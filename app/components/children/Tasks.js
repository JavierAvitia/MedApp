import React, { Component } from "react";
import Panel from "./grandchildren/Panel";
import TaskForm from "./grandchildren/TaskForm";
import API from "../../utils/API";

class Tasks extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    };
    // Binding getQuotes to our component since we'll be passing this
    // method to child components
    this.getTasks = this.getTasks.bind(this);
  }
  // Getting all quotes when the component mounts
  componentDidMount() {
    this.getTasks();
  }
  getTasks() {
    API.getTasks().then((res) => {
      // console.log(res);
      this.setState({ tasks: res.data });
      // this.state.quotes.map(quote => console.log(quote.id));
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
        <div className="row">
          <TaskForm
            getTasks={this.getTasks}
          />
        </div>
        <div className="row">
          <hr />
          {this.renderTasks()}
        </div>
      </div>
    );
  }
}

export default Tasks;
