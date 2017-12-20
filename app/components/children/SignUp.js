import React from "react";
import SUform from "./grandchildren/SUform";

const SignUp = (props) => (

	<div className="container">
	    <div className="jumbotron text-center">
  			<div className="row">
  				<div className="col-md-6 col-md-offset-3">
    				<h2 style={{color:'#0079bf'}}>Sign Up</h2>
    				<SUform setCookie={props.setCookie} />
  				</div>
  			</div>
	    </div>
	</div>

);

export default SignUp;


