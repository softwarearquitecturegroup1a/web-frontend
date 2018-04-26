import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink, Link } from "react-router-dom";
import { ActionsType } from "../reducers";
import { push } from 'react-router-redux'

class Logo extends Component {
  render() {
    return (
      <NavLink className="navbar-brand js-scroll-trigger" to="/">Bici-UN</NavLink>
    );
  }
}

function NavBarLink(props) {

  // let session = cookie.load("session");
  if (props.render) {
    return (<Link onClick={() => props.onClick ? props.onClick() : null} className={props.className} to={props.to}>{props.value}</Link>)
  }
  return '';
}

class LinksCollapse extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      renderLogin: !props.isAuthenticated,
      renderPerfil: props.isAuthenticated,
      renderLogout: props.isAuthenticated,
    }
  }
  static getDerivedStateFromProps(nextProps, prevState){
    return {
      renderLogin: !nextProps.isAuthenticated,
      renderPerfil: nextProps.isAuthenticated,
      renderLogout: nextProps.isAuthenticated,
    }
  }
  render() {
    console.log(`LinksCollapse.render: ${JSON.stringify(this.state)}`)
    return (
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mx-0 mx-lg-1">
            <NavBarLink render={this.state.renderLogin} className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" value="Login" to="/login" />
          </li>
          <li className="nav-item mx-0 mx-lg-1">
            <NavBarLink render={this.state.renderPerfil} className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/perfil" value="Perfil" />
          </li>
          <li className="nav-item mx-0 mx-lg-1">
            <NavBarLink render={this.state.renderLogout} onClick={this.props.onLogout} className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/" value="Logout" />
          </li>
        </ul>
      </div>
    );
  }
}

class Menu extends Component {
  render() {
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

class ComponentNavBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      isAuthenticated: props.isAuthenticated,
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-secondary fixed-top text-uppercase" id="mainNav">
        <div className="container">
          <Logo />
          <Menu />
          <LinksCollapse isAuthenticated={this.props.isAuthenticated} onLogout={this.props.logout}/>
        </div>
      </nav>
    );
  }
}

const NavBar = connect(
  state => ({
    isAuthenticated: state.authReducers.isAuthenticated
  }),
  dispatch => ({
    logout: () => {
      console.log("logout")
      dispatch({
        type: ActionsType.LOGOUT
      })
      dispatch(push('/login'))
    }
  })
)(ComponentNavBar)

export default NavBar;
