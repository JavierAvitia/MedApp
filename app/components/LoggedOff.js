import React from "react";
import { Route } from 'react-router-dom';
import NavbarLOff from "./common/NavbarLOff";
import Footer from "./common/Footer";
import Login from "./children/Login";
import HomeLOff from "./children/HomeLOff";
import SignUp from "./children/SignUp";

const LoggedOff = (props) => (
	<div>
		<NavbarLOff pathName={props.pathName} />
	    <Route exact path="/" component={HomeLOff} />
	    <Route path="/login" render={() => (<Login setCookie={props.setCookie}/>)} />
	    <Route path="/signup" render={() => (<SignUp setCookie={props.setCookie}/>)} />
	    <Footer />
	</div>
);

export default LoggedOff;
