import React, { Component } from "react";
import { Route } from 'react-router-dom';
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Priorities from "../components/Priorities";
import Home from "../components/Home";
import Tasks from "../components/Tasks";

/*const Main = () => (
  <div>
    <Navbar />
		<Route exact path="/" component={Home}/>
	    <Route path="/favorites" component={Favorites} />
    <Footer />
  </div>
);*/

class Main extends Component {
  constructor() {
    super();
    this.state = {
      path: "/",
      username: "Jacob"
    };
    // Binding getQuotes to this component since we'll be passing this method to 
    // other components to use
    this.pathName = this.pathName.bind(this);
  }
  // Getting all quotes once the component has mounted
  pathName(path) {
    this.setState({path});
  }
  render() {
    return (
      <div>
	    <Navbar pathName={this.pathName} />
			<Route exact path="/" render={(props) => (<Home username={this.state.username} {...props}/>)} />
      <Route path="/tasks" component={Tasks} />
		  <Route path="/priorities" component={Priorities} />
	    <Footer />
	  </div>
    );
  }
}

export default Main;
