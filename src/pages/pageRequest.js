import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import glRequest from '../graphQLUtils';

class SelectOption extends Component {

  render() {
    return (
      <div className="form-group floating-label-form-group controls mb-0 pb-2 text-center">
        <h5 className="text-center">Estacion de {this.props.name}</h5>
        <select className="form-control text-center" value={this.props.value} onChange={this.props.onChange} >
          <option value="CyT">Edificio CyT</option>
          <option value="Central">Biblioteca central</option>
          <option value="Uriel">Entrada Edificio Uriel Gutierrez</option>
          <option value="Capilla">Capilla</option>
          <option value="Estadio">Estadio</option>
          <option value="Humanas">Facultad de humanas</option>
        </select>
        <p className="help-block text-danger">
          {this.props.error}
        </p>
      </div>
    )
  }
}

class Request extends Component {

  constructor(props) {
    super(props);
    this.state = {
      origen: 'CyT',
      final: 'CyT',
      origenError: '',
      finalError: '',
      bicicletasOrigen: null
    }

    var request = `
    {
      estacionByName(token: "${this.props.user}", name: "${this.state.origen}"){
        serial
        marca
        estado
      }
    }`;

    glRequest(request,
      data => {
        var msg;
        if (!data.estacionByName) {
          msg = "No hay bicicletas disponibles en esta estación"
        }

        var bicisDisponibles = []
        data.estacionByName.forEach(bici => {
          if (bici.estado === "Disponible") {
            bicisDisponibles.push(bici)
          }
        })

        if (bicisDisponibles.length < 1) {
          msg = "No hay bicicletas disponibles en esta estación"
        }

        this.setState({ origenError: msg, bicicletasOrigen: bicisDisponibles })
      }
    );
  }

  handleStartChange(event) {
    const origen = event.target.value

    var request = `
    {
      estacionByName(token: "${this.props.user}", name: "${origen}"){
        serial
        marca
        estado
      }
    }`;

    glRequest(request,
      data => {
        var msg;
        if (!data.estacionByName) {
          msg = "No hay bicicletas disponibles en esta estación"
        }

        var bicisDisponibles = []
        data.estacionByName.forEach(bici => {
          if (bici.estado === "Disponible") {
            bicisDisponibles.push(bici)
          }
        })

        if (bicisDisponibles.length < 1) {
          msg = "No hay bicicletas disponibles en esta estación"
        }

        this.setState({ origen: origen, origenError: msg, bicicletasOrigen: bicisDisponibles })
      }
    );
  }

  handleEndChange(event) {
    this.setState({ final: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const origen = this.state.origen;
    const final = this.state.final;
    const disponibles = this.state.bicicletasOrigen

    if (origen === final) {
      this.setState({ finalError: "Cambia las estaciones!" })
      event.preventDefault();
      return
    }

    if (!disponibles || disponibles.length < 1) {
      this.setState({ finalError: "No hay bicicletas disponibles en esta estación" })
      event.preventDefault();
      return
    }

    // Apartar bicicleta 

    var requestBici = `
    mutation{
      updateBicicleta(token: "${this.props.user}", serial: ${disponibles[0].serial}, 
      bicicleta:{
        estado: "Ocupado"
        ubicacion: "${final}"
      }){
        serial
      }
    }`;


    await glRequest(requestBici,
      data => {
        if (!data.updateBicicleta) {
          this.setState({ finalError: "No hemos podido aparatar tu bici D=" })
          event.preventDefault();
        } else {

        }
      }
    )

    if (this.state.finalError || this.state.origenError)
      return;

    // Crear el prestamo

    var request = `
    mutation{
      createPrestamo(token: "${this.props.user}", prestamo: {
        bici_id: ${disponibles[0].serial}
      }){
        id
        solicitud
      }
    }`;

    await glRequest(request,
      data => {
        if (!data.createPrestamo) {
          this.setState({ finalError: "Algo ha salido mal con tu prestamo D=" })
          event.preventDefault();
        } else {

        }
      }
    )
    if (this.state.finalError || this.state.origenError) {
      return
    }
  }

  render() {
    return (
      <section className="portfolio" >

        <form name="sentMessage" id="contactForm" onSubmit={this.handleSubmit.bind(this)} action="/timer">
          <div className="control-group">
            <SelectOption value={this.state.origen} name={"Inicio"} onChange={this.handleStartChange.bind(this)}
              error={this.state.origenError} />
          </div>
          <div className="control-group">
            <SelectOption value={this.state.final} name={"Final"} onChange={this.handleEndChange.bind(this)}
              error={this.state.finalError} />
          </div>
          <br />
          <div className="form-group text-center">
            <a className="portfolio-item d-block mx-auto" href="#bicishow">
              <button type="submit" className="btn btn-primary btn-xl" id="sendMessageButton" href="#bicishow">Solicitar</button>
            </a>
          </div>
        </form>
      </section>
    )
  }
}
class ComponentPageRequest extends Component {

  constructor(props) {
    super(props)
    this.state = {
      prestamos: []
    }
  }

  componentDidMount(){
    
    var request = `
    {
      prestamosPendientes(token: "${this.props.user}"){
        id
      }
    }`;

    glRequest(request,
      data => {
        if (!data.prestamosPendientes) {
          return;
        }
        this.setState({ prestamos: data.prestamosPendientes }) // Sin prestamos
      }
    )
  }

  render() {

    if (!this.props.isAuthenticated){
      return <Redirect to="/" />;
    }
    if(this.state.prestamos.length > 0){
      return <Redirect to="/timer" />;
    }

    return (
      <section id="request" style={{ "paddingTop": "calc(6rem + 72px)" }} >
        <div className="container">
          <h2 className="text-center text-uppercase text-secondary mb-0">Inicia tu viaje</h2>
          <hr className="star-dark mb-5" />
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <Request user={this.props.user} />
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
</div> 
----------------------------------
<div className="portfolio-modal mfp-hide" id="bicishow">
  <div className="portfolio-modal-dialog bg-white">
    <a className="close-button d-none d-md-block portfolio-modal-dismiss" href="/entregar">
      <i className="fa fa-3x fa-times"></i>
    </a>
    <div className="container text-center">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h2 className="text-secondary text-uppercase mb-0">Tu bicicleta es:</h2>
          <hr className="star-dark mb-5"/>
          <p className="mb-5">{this.state.bicid}</p>
          <a className="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" href="/entregar">
            <i className="fa fa-close"></i>
            Entendido</a>
        </div>
      </div>
    </div>
  </div>
</div>
*/