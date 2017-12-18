import React, { Component } from "react";
import { Route } from 'react-router-dom';
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Priorities from "./children/Priorities";
import Home from "./children/Home";
import Tasks from "./children/Tasks";
import LoggedIn from "./LoggedIn";
import LoggedOff from "./LoggedOff";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      path: "/",
      username: ""
    };
    // Binding getQuotes to this component since we'll be passing this method to 
    // other components to use
    this.pathName = this.pathName.bind(this);
    this.setCookie = this.setCookie.bind(this);
  }

  componentDidMount(){
    var username = this.getCookie("username");
    this.setState({username})
  }

  setCookie(cookieTitle,cookieValue){
    document.cookie = cookieTitle + "=" + cookieValue;
  }

  getCookie(cname){
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }
  // componentDidMount(){
  //   var cookie = this.getCookie("userId");
  // }
  // Getting all quotes once the component has mounted
  pathName(path) {
    this.setState({path});
  }
  //Below will fail because only one component can be sent as part of the conditional, but these components can all
  // be combined in a separate component and the imported here.
  render() {
    return (
      <div>
  	    {this.getCookie("userId") ? <LoggedIn pathName={this.pathName} username={this.state.username} />
        : <LoggedOff pathName={this.pathName} setCookie={this.setCookie} />}
  	  </div>
    );
  }
}

export default Main;
