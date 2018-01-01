import React, { Component } from "react";
import API from "../../utils/API";
import { withRouter } from 'react-router-dom';

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
    this.setState({ name: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  fireLaserz(e) {
  	//console.log("Pew pew!");
  	// add logic to compare passwords and only create user if passwords match--otherwise display error.
  	API.loginUser(this.state.name,this.state.password).then((res) => {

      var check = typeof res.data;
      if(check === "string"){
        alert(res.data);
      } else{
        this.props.setCookie("userId",res.data.id);
        this.props.setCookie("username",res.data.name);
        this.props.history.push('/');
      }

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
    							<label style={{color:'#0079bf'}} htmlFor="name">Email/Username:</label>
    							<input type="text" className="form-control" id="name" onChange={this.handleNameChange} />
    							<br />
    							<label style={{color:'#0079bf'}} htmlFor="password">Password:</label>
    							<input type="password" className="form-control" id="password" onChange={this.handlePasswordChange} />
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

export default withRouter(Login);
