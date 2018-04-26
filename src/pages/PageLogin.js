import React, { Component } from 'react'
import GlReuqest from '../graphQLUtils'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Redirect } from 'react-router-dom'
import { ActionsType } from "../reducers";

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      pass: '',
      idError: '',
      passError: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = this.state.id;
    const pass = this.state.pass;

    if (!id || id.length < 1) {
      this.setState({ idError: 'Escriba un usuario valido.' })
      return;
    }

    if (!pass || pass.length < 1) {
      this.setState({ passError: 'Identificacion invalida.' })
      return;
    }

    // Ejemplo de uso GraphQL
    var request = `query{
      userById(id: ${id}){
        name
        lastname
        email
        id_code
      }
    }`

    GlReuqest(
      request,
      (data) => {
        if (data && data.userById) {
          this.props.onSubmit(data.userById);
        }
      },
      (status, data) => {
        console.log(`status: ${status}`);
      }
    );
  }

  handleIdChange(event) {
    this.setState({ id: event.target.value });
  }

  handlePassChange(event) {
    this.setState({ pass: event.target.value });
  }

  render() {
    
    return (
      <form name="sentMessage" id="contactForm" noValidate="novalidate" onSubmit={this.handleSubmit.bind(this)} >
        <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2 text-center">
            <label>Identificación</label>
            <input className="form-control text-center" type="number" value={this.state.id} placeholder="Identificación" onChange={this.handleIdChange.bind(this)} />
            <p className="help-block text-danger">{this.state.idError}</p>
          </div>
        </div>

        <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2 text-center">
            <label>Password</label>
            <input className="form-control text-center" type="password" value={this.state.pass} placeholder="Contraseña" onChange={this.handlePassChange.bind(this)} />
            <p className="help-block text-danger">{this.state.passError}</p>
          </div>
        </div>
        <br />
        <div id="success"></div>
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary btn-xl" id="sendMessageButton">Login</button>
        </div>
      </form>
    );
  }
}

class Login extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return (
        <Redirect to='/' />
      )
    }

    return (
      <section id="contact" style={{ "paddingTop": "calc(6rem + 72px)" }}>
        <div className="container">
          <h2 className="text-center text-uppercase text-secondary mb-0">Login</h2>
          <hr className="star-dark mb-5" />

          <div className="row">
            <div className="col-lg-8 mx-auto">
              <Formulario onSubmit={this.props.login}/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const PageLogin = connect(
  state => ({
    isAuthenticated: state.authReducers.isAuthenticated,
  }),
  dispatch => ({
    login: (info) => {
      dispatch({
        type: ActionsType.LOGIN,
        payload: info,
      })
      dispatch(push('/login'))
    }
  })
)(Login)

export default PageLogin;