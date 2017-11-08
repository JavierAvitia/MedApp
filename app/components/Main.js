import React, { Component } from "react";
import { Route } from 'react-router-dom';
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Favorites from "../components/Favorites";
import Home from "../components/Home";

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
      path: "/"
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
			<Route exact path="/" component={Home}/>
		    <Route path="/favorites" component={Favorites} />
	    <Footer />
	  </div>
    );
  }
}

export default Main;
