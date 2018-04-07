import React, { Component } from 'react';

class Logo extends Component {
  render(){
    return(
      <a className="navbar-brand js-scroll-trigger" href="index.html">Bici-UN</a>
    );
  }
}

class LinksCollapse extends Component{
  render(){
    return (
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mx-0 mx-lg-1">
            <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="login.html">Login</a>
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

class NavBar extends Component {
  render(){
    return(
      <nav className="navbar navbar-expand-lg bg-secondary fixed-top text-uppercase" id="mainNav">
        <div className="container">
          <Logo/>
          <Menu/>
          <LinksCollapse/>
        </div>
      </nav>
    );
  }
}

export default NavBar;
