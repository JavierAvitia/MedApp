import React, { Component } from "react";
import { Route } from 'react-router-dom';
import LoggedIn from "./LoggedIn";
import LoggedOff from "./LoggedOff";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      path: "/",
      username: ""
    };
    this.logout = this.logout.bind(this);
    this.pathName = this.pathName.bind(this);
    this.setCookie = this.setCookie.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }

  componentDidMount(){
    this.setUsername();
  }

  setUsername(){
    var username = this.getCookie("username");
    this.setState({username})
  }

  setCookie(cookieTitle,cookieValue){
    document.cookie = cookieTitle + "=" + cookieValue;
    if(cookieTitle === "username"){
      this.setUsername();
    }
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

  pathName(path) {
    this.setState({path});
  }

  logout(){
    var logoutArr = ["username","userId"];

    logoutArr.map(function(title){
      this.setCookie(title,"; expires=Thu, 18 Dec 2013 12:00:00 UTC");
    }.bind(this));

  }

  render() {
    return (
      <div>

  	    {
          this.getCookie("userId")
          ? <LoggedIn pathName={this.pathName} username={this.state.username} loggedIn={true} logout={this.logout} />
          : <LoggedOff pathName={this.pathName} setCookie={this.setCookie} loggedIn={false} />
        }

  	  </div>
    );
  }
}

export default Main;
