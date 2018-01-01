import React from "react";
import { Route } from 'react-router-dom';
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Priorities from "./children/Priorities";
import Home from "./children/Home";
import Tasks from "./children//Tasks";

// use const and render the usual stuff in a component so boolean && can be used
// to either render the page or to render the login page

const LoggedIn = (props) => (
	<div>
		<Navbar pathName={props.pathName} loggedIn={props.loggedIn} logout={props.logout} />
	    <Route exact path="/" render={() => (<Home username={props.username}/>)} />
	    <Route path="/tasks" component={Tasks} />
	    <Route path="/priorities" component={Priorities} />
	    <Footer />
	</div>
);

export default LoggedIn;
