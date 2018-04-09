import React, { Component } from 'react';
import { Link, IndexLink } from "react-router";

class Logo extends Component {
  render(){
    return(
      <IndexLink className="navbar-brand js-scroll-trigger" to="/">Bici-UN</IndexLink>
    );
  }
}

class LinksCollapse extends Component{
  render(){
    return (
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mx-0 mx-lg-1">
            <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/profile">Perfil</Link>
          </li>
          <li className="nav-item mx-0 mx-lg-1">
            <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/">Logout</Link>
          </li>
        </ul>
      </div>
    );
  }
}

class Menu extends Component {
  render(){
    return (
    <button className="navbar-toggler navbar-toggler-right text-uppercase bg-primary text-white rounded"
      type="button" data-toggle="collapse" data-target="#navbarResponsive"
      aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
      <i className="fa fa-bars"></i>
    </button>
    );
  }
}

class NavBarLogin extends Component {
  render(){
    return(
      <nav className="navbar navbar-expand-lg bg-secondary fixed-top text-uppercase" id="mainNav">
        <div className="container">
          <Logo/>
          <Menu/>
        </div>
      </nav>
    );
  }
}

export default NavBarLogin;
