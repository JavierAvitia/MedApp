import React, { Component } from "react";
import API from "../../utils/API";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password:""
    };
    // Binding getQuotes to this component since we'll be passing this method to 
    // other components to use
    this.fireLaserz = this.fireLaserz.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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

  fireLaserz(e) {
  	//console.log("Pew pew!");
  	// add logic to compare passwords and only create user if passwords match--otherwise display error.
  	API.saveUser(this.state.username,this.state.email,this.state.password).then((res) => {
      console.log(res);
      // this.setState({ quotes: res.data });
      // this.state.quotes.map(quote => console.log(quote.id));
    });
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
			            value={this.state.nameValue}
			            placeholder="JaneDoe"/>
						<br />
				            <label style={{color:'#0079bf'}} htmlFor="email">Email:</label>
				            <input type="text" className="form-control" id="email" onChange={this.handleEmailChange}
				            value={this.state.emailValue}
				            placeholder="JaneDoe@gmail.com"/>
				            <br />
							<label style={{color:'#0079bf'}} htmlFor="password">Password:</label>
							<input type="password" className="form-control" id="password" />
							<br />
				            <label style={{color:'#0079bf'}} htmlFor="confirmPassword">Confirm Password:</label>
				            <input type="password" className="form-control" id="confirmPassword" onChange={this.handlePasswordChange}
				            value={this.state.passwordValue}
				            placeholder="123#Abc"/>
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


