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
          <option value="CyT">Edificio CyT</option>
          <option value="Central">Biblioteca central</option>
          <option value="Uriel">Entrada Edificio Uriel Gutierrez</option>
          <option value="Capilla">Capilla</option>
          <option value="Estadio">Estadio</option>
          <option value="Humanas">Facultad de humanas</option>
        </select>
        <p className="help-block text-danger"></p>
      </div>
    )
  }
}

function Assigned(props){
  console.log("As"+props.bike)
  return <h2>{props.bike}</h2>
}

class Request extends Component {

  constructor(props){
    super(props);
    this.state = {
      origen: 'CyT',
      final: 'CyT',
      origenError: '',
      finalError: ''

    
    };

    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }

  handleStartChange(event) { 
    this.setState({ origen: event.target.value });
    console.log(event.target.value)
  }

  handleEndChange(event) {
    this.setState({ final: event.target.value });
    console.log(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault();

    const origen = this.state.origen;
    const final = this.state.final;
    console.log("submit data")

    let requestPerfil = `
    query{
      userById(token: "${this.props.user}"){
        id
        name
        lastname
        id_code
        email
        id_type
      }
    }`;

    GraphQLRequest(requestPerfil,
      data => {
        this.setState({ user: data.userById })
      }
    );
    
    let requestBici = `
    query{
      estacionByName(token: "${this.props.user}", name: "${origen}"){
        serial
        estado
        marca
        color
      }
    }`;

    

    GraphQLRequest(requestBici,
      data => {
        data.estacionByName.map((bicicleta)=>{
          if (bicicleta.estado === "Disponible")
            
            return this.setState({ bici: bicicleta.serial })
        })
        console.log("probando console"+this.state.bici)
        localStorage.setItem("bici",this.state.bici)
      }
    );

    
    var bicid = localStorage.getItem("bici")
    console.log("bici "+localStorage.getItem("bici"))

    let requestPres = `
    mutation{
      createPrestamo(token: "${this.props.user}", prestamo:{
        bici_id: ${bicid}
      }){
        id
      }
    }`;

    GraphQLRequest(requestPres,
      data => {
        console.log(data.createPrestamo.id)
      }
    );

    console.log("paso "+bicid);

    <Assigned bike={bicid}/>

    


    
  }
  
  render() {
    return (
      <form name="sentMessage" id="contactForm" noValidate="novalidate" onSubmit={this.handleSubmit.bind(this)} action="/">
        <div className="control-group">
          <SelectOption value={this.state.origen} onChange={this.handleStartChange}/>
        </div>
        <div className="control-group">
          <SelectOption value={this.state.final} onChange={this.handleEndChange}/>
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

  constructor(props) {
    super(props)
    this.state = {
      perfil: null,
    }  
  
  }

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
              <Request user={this.props.user}/>
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