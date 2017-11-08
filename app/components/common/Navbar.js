import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => (
  <nav style={{ marginBottom: 0 }} className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/" onClick={() => this.props.pathName()}>Quotes App</Link>
      </div>
      <ul className="nav navbar-nav">
        <li className={location.pathname === "/" && "active"}>
          <Link to="/" onClick={() => this.props.pathName()}>Home</Link>
        </li>
        <li className={location.pathname === "/favorites" && "active"}>
          <Link to="/favorites" onClick={() => this.props.pathName()}>Favorites</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
