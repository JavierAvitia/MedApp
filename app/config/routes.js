import React from "react";
// import { Route, IndexRoute, Router, browserHistory } from "react-router";
import { Route, IndexRoute, BrowserRouter, Switch } from "react-router-dom";
import Main from "../components/Main";

const routes = (
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);

export default routes;
