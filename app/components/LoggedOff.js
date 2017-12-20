import React from "react";
import { Route } from 'react-router-dom';
import NavbarLOff from "./common/NavbarLOff";
import Footer from "./common/Footer";
import Login from "./children/Login";
import HomeLOff from "./children/HomeLOff";
import SignUp from "./children/SignUp";
import Main from "./Main";

// use const and render the usual stuff in a component so boolean && can be used
// to either render the page or to render the login page

const LoggedOff = (props) => (
	<div>
		<NavbarLOff pathName={props.pathName} />
	    <Route exact path="/" component={HomeLOff} />
	    <Route path="/login" component={Login} />
	    <Route path="/signup" render={() => (<SignUp setCookie={props.setCookie}/>)} />
	    <Footer />
	</div>
);

export default LoggedOff;
