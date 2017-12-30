import React, { Component } from "react";
import API from "../../../utils/API";

class TaskForm extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: ""
    };
    // Binding handleInputChange and handleButtonClick since we'll be passing them as
    // callbacks and 'this' will change otherwise
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  handleInputChange(event) {
    this.setState({ inputValue: event.target.value });
    // console.log(this.state.inputValue);
  }
  handleButtonClick() {
    const newTask = this.state.inputValue;
    // console.log(newQuote);
    API.saveTask(newTask).then(this.props.getTasks);
    this.setState({ inputValue: "" });
  }
  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <div style={styles.formStyle} className="form-group">
          <label htmlFor="input-box">
            Add a task
          </label>
          <textarea
            style={{
              resize: "none"
            }}
            onChange={this.handleInputChange}
            value={this.state.inputValue}
            placeholder="Add a new task here!"
            className="form-control"
            id="input-box"
            rows="3"
          />
          <button
            onClick={this.handleButtonClick}
            className="btn btn-success"
            style={styles.buttonStyle}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  buttonStyle: {
    float: "right",
    marginTop: 10
  },
  formStyle: {
    marginBottom: 60,
    marginTop: 60
  }
};

export default TaskForm;