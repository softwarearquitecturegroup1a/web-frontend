import React, { Component } from 'react';
import GlReuqest from '../graphQLUtils';
import cookie from 'react-cookies'

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      identification: '',
      userError: '',
      identificationError: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    // TODO: Enviar peticion al servicio login
    const user = this.state.user;
    const identification = this.state.identification;
    let error = true;

    if (!user || user.length < 1) {
      this.setState({ userError: 'Escriba un usuario valido.' })
      error = true;
    }

    if (!identification || identification.length < 1) {
      this.setState({ identificationError: 'Identificacion invalida.' })
      error = true;
    }

    var data = JSON.stringify({
      user: user,
      id: identification
    });

    // Ejemplo de uso GraphQL

    var request = `mutation{
      createPrestamo(prestamo: {
        student_id: 12,
        solicitud: "fdgfdgdfgf"
      }){
        id
        solicitud
      }
    }`

    // GlReuqest( request, null, (status, errors) => {
    //   errors.forEach((item) => {
    //       console.log(item)
    //     }
    //   )
    // });

    cookie.save('userName', user, { path: '/', });
    cookie.save('session', identification, { path: '/', });

  }

  handleUserChange(event) {
    this.setState({ user: event.target.value });
  }

  handleIdentificationChange(event) {
    this.setState({ identification: event.target.value });
  }

  render() {
    return (
      <form name="sentMessage" id="contactForm" noValidate="novalidate" onSubmit={this.handleSubmit.bind(this)} action="/">
        <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2 text-center">
            <label>Usuario</label>
            <input className="form-control text-center" id="user" type="text" value={this.state.user} placeholder="Usuario" required="required" onChange={this.handleUserChange.bind(this)} />
            <p className="help-block text-danger">{this.state.userError}</p>
          </div>
        </div>

        <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2 text-center">
            <label>Identificacion</label>
            <input className="form-control text-center" id="identification" type="number" value={this.state.identification} placeholder="Identificacion" required="required" onChange={this.handleIdentificationChange.bind(this)} />
            <p className="help-block text-danger">{this.state.identificationError}</p>
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

class PageLogin extends Component {
  render() {
    return (
      <section id="contact" style={{ "paddingTop": "calc(6rem + 72px)" }}>
        <div className="container">
          <h2 className="text-center text-uppercase text-secondary mb-0">Login</h2>
          <hr className="star-dark mb-5" />

          <div className="row">
            <div className="col-lg-8 mx-auto">
              <Formulario />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default PageLogin;