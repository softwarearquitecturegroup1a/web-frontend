import React, { Component } from 'react';

class Formulario extends Component {
  render() {
    return (
      <form name="sentMessage" id="contactForm" noValidate="novalidate">
        <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2 text-center">
            <label>Usuario</label>
            <input className="form-control text-center" id="user" type="text" placeholder="Usuario" required="required" data-validation-required-message="Please enter your user." />
            <p className="help-block text-danger"></p>
          </div>
        </div>

        <div className="control-group">
          <div className="form-group floating-label-form-group controls mb-0 pb-2 text-center">
            <label>Identificacion</label>
            <input className="form-control text-center" id="identification" type="number" placeholder="Identificacion" required="required" data-validation-required-message="Please enter your identification number." />
            <p className="help-block text-danger"></p>
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
      <section id="contact">
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