import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password:""
    };
    // Binding getQuotes to this component since we'll be passing this method to 
    // other components to use
    this.fireLaserz = this.fireLaserz.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({ username: event.target.value });
    // console.log(this.state.inputValue);
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
    // console.log(this.state.inputValue);
  }

  fireLaserz(e) {
  	//console.log("Pew pew!");
  	// add logic to compare passwords and only create user if passwords match--otherwise display error.
  	API.loginUser(this.state.username,this.state.password).then((res) => {
  		var data = res.data;
		if (data.username) {
		    alert("Incorrect email or username");
		    return;
		} else if (!data.password) {
		    alert("Incorrect password");
		    return;
		} else {
			console.log(res,data);
		}
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
    	        		<h2 style={{color:"#0079bf"}}>Login</h2>
    					<form id="login" onSubmit={(e) => this.fireLaserz(e)}>
    						<div className="form-group">
    							<label style={{color:'#0079bf'}} htmlFor="username">Email/Username:</label>
    							<input type="text" className="form-control" id="username" />
    							<br />
    							<label style={{color:'#0079bf'}} htmlFor="password">Password:</label>
    							<input type="password" className="form-control" id="password" />
    							<br />
    							<button type="submit" className="btn btn-success submit">Login</button>
    						</div>
    					</form>
    				</div>
    			</div>
    	    </div>
    	</div>
    );
  }
}

export default Login;
