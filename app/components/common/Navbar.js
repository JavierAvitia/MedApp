import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => (
  <nav style={{ marginBottom: 0 }} className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/" onClick={() => this.props.pathName("/")}>Quotes App</Link>
      </div>
      <ul className="nav navbar-nav text-center">
        <li className={location.pathname === "/" && "active"}>
          <Link to="/" onClick={() => this.props.pathName("/")}>Home</Link>
        </li>
        <li className={location.pathname === "/tasks" && "active"}>
          <Link to="/tasks" onClick={() => this.props.pathName("/tasks")}>Tasks</Link>
        </li>
        <li className={location.pathname === "/priorities" && "active"}>
          <Link to="/priorities" onClick={() => this.props.pathName("/priorities")}>Priorities</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
