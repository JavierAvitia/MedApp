import React from "react";
import { Link } from "react-router-dom";

const NavbarLOff = (props) => (
  <nav style={{ marginBottom: 0 }} className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/" onClick={() => this.props.pathName("/")}>Med App</Link>
      </div>
      <ul className="nav navbar-nav text-center">
        <li className={location.pathname === "/login" && "active"}>
          <Link to="/login" onClick={() => this.props.pathName("/login")}>Login</Link>
        </li>
        <li className={location.pathname === "/signup" && "active"}>
          <Link to="/signup" onClick={() => this.props.pathName("/signup")}>Sign-Up</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default NavbarLOff;
