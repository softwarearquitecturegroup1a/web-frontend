import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import GraphQLRequest from '../graphQLUtils';

class SelectOption extends Component {

  render(){
    return (
      <div className="form-group floating-label-form-group controls mb-0 pb-2 text-center">
        <h5 className="text-center">Estacion de inicio</h5>
        <select className="form-control text-center" value={"null"} onChange={this.props.onChange.bind(this)} >
          <option>Edificio CyT</option>
          <option>Entrada Calle 26</option>
          <option>Entrada Edificio Uriel Gutierrez</option>
          <option>Entrada Calle 53</option>
          <option>Entrada Calle 45</option>
        </select>
        <p className="help-block text-danger"></p>
      </div>
    )
  }
}

class Request extends Component {

  handleStartChange(event) {
    this.setState({ start: event.target.value });
    console.log(event.target.value)
  }

  handleEndChange(event) {
    this.setState({ end: event.target.value });
    console.log(event.target.value)
  }

  handleSubmit(event) {
    console.log("submit data")
  }
  
  render() {
    return (
      <form name="sentMessage" id="contactForm" noValidate="novalidate" onSubmit={this.handleSubmit.bind(this)} action="/">
        <div className="control-group">
          <SelectOption onChange={this.handleStartChange}/>
        </div>
        <div className="control-group">
          <SelectOption onChange={this.handleEndChange}/>
        </div>
        <br />
        <div id="success"></div>
        <div className="form-group text-center">
          <a className="portfolio-item d-block mx-auto" href="#bicishow">
            <button type="submit" className="btn btn-primary btn-xl" id="sendMessageButton" href="#bicishow">Solicitar</button>
          </a>
        </div>
      </form>

    )
  }
}
class ComponentPageRequest extends Component {
  render() {
    if(!this.props.isAuthenticated)
      return <Redirect to="/" />;
    return (
      <section id="request" style={{ "paddingTop": "calc(6rem + 72px)" }} >
        <div className="container">
          <h2 className="text-center text-uppercase text-secondary mb-0">Inicia tu viaje</h2>
          <hr className="star-dark mb-5" />
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <Request />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const PageRequest = connect(
  state => ({
    isAuthenticated: state.authReducers.isAuthenticated,
    user: state.authReducers.user,
  })
)(ComponentPageRequest)

export default PageRequest;

/* <div className="container text-center">
  <div className="row">
    <div className="col-lg-8 mx-auto">
      <h2 className="text-secondary text-uppercase mb-0">Tu bici es la:</h2>
      <hr className="star-dark mb-5" />
      <h5 className="mb-5"> {bicid} </h5>
      <a className="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" data-dismiss="modal">
        <i className="fa fa-close"></i>
        ¡Vamos!</a>
    </div>
  </div>
</div> */