import React, { Component } from "react";
import SUform from "./grandchildren/SUform";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
	<div className="container">
	    <div className="jumbotron text-center">
			<div className="row">
				<div className="col-md-6 col-md-offset-3">
				<h2 style={{color:'#0079bf'}}>Sign Up</h2>
				<SUform setCookie={this.props.setCookie} />
				</div>
			</div>
	    </div>
	</div>
    );
  }
}

export default SignUp;


