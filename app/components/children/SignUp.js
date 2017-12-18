import React, { Component } from "react";
import API from "../../utils/API";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password:"",
      confirm: ""
    };
    // Binding getQuotes to this component since we'll be passing this method to 
    // other components to use
    this.fireLaserz = this.fireLaserz.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmChange = this.handleConfirmChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({ username: event.target.value });
    // console.log(this.state.inputValue);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
    // console.log(this.state.inputValue);
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
    // console.log(this.state.inputValue);
  }

  handleConfirmChange(event) {
    this.setState({ confirm: event.target.value });
    // console.log(this.state.inputValue);
  }

  fireLaserz(e) {
  	// add logic to compare passwords and only create user if passwords match--otherwise display error.
    if(this.state.password === this.state.confirm){
      API.saveUser(this.state.username,this.state.email,this.state.password).then((res) => {
        //console.log(res);
        this.props.setCookie("userId",res.data.id);
        this.props.setCookie("username",res.data.name);
      });
    }
    else{
      alert("Passwords do not match!");
    }

  	e.preventDefault();
  	return false;
  }

  render() {
    return (
	<div className="container">
	    <div className="jumbotron text-center">
			<div className="row">
				<div className="col-md-6 col-md-offset-3">
				<h2 style={{color:'#0079bf'}}>Sign Up</h2>
				<form id="signup" onSubmit={(e) => this.fireLaserz(e)}>
					<div className="form-group">
						<label style={{color:'#0079bf'}} htmlFor="username">Username:</label>
						<input type="text" className="form-control" id="username" onChange={this.handleNameChange}
            value={this.state.username} placeholder="JaneDoe"/>
						<br />
            <label style={{color:'#0079bf'}} htmlFor="email">Email:</label>
            <input type="text" className="form-control" id="email" onChange={this.handleEmailChange}
            value={this.state.email} placeholder="JaneDoe@gmail.com"/>
            <br />
						<label style={{color:'#0079bf'}} htmlFor="password">Password:</label>
						<input type="password" className="form-control" id="password" onChange={this.handlePasswordChange}
            value={this.state.password} placeholder="123#Abc"/>
						<br />
            <label style={{color:'#0079bf'}} htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" className="form-control" id="confirmPassword" onChange={this.handleConfirmChange}
            value={this.state.confirm} placeholder="123#Abc"/>
            <br />
						<button type="submit" className="btn btn-success submit">Sign Up</button>
					</div>
				</form>
				</div>
			</div>
	    </div>
	</div>
    );
  }
}

export default SignUp;


