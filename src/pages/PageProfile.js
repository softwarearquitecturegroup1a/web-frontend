import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import GraphQLRequest from '../graphQLUtils';

class Prestamo extends Component {

  constructor(props){
    super(props)
    let fechaSolicitud = new Date(this.props.prestamo.solicitud);
    this.state ={
      marca: "",
      fecha: fechaSolicitud.toLocaleDateString(),
      hora: fechaSolicitud.toLocaleTimeString(),
      biciSerial: props.prestamo.bici_id,
      biciMarca: ""
    }

    let requestPerfil = `
    query{
      bicicletaById(token: "${props.user}", serial: ${props.prestamo.bici_id}){
        marca
      }
    }`;

    GraphQLRequest(requestPerfil,
      data => {
        this.setState({ biciMarca: data.bicicletaById.marca })
      }
    );

  }

  render() {
    
    return (
      <tr>
        <td>{this.props.ind + 1}</td>
        <td>{this.state.fecha}</td>
        <td> {this.state.hora}</td>
        <td>{this.state.biciMarca} {this.state.biciSerial}</td>
      </tr>
    )
  }
}

class Historial extends Component {
  
  render() {
    if (!this.props.prestamos)
      return "Cargando"
    return (
      <div className="container">
        <hr size="2px" color="black" />
        <h3 className="text-center text-uppercase text-secondary mb-0">Historial de Prestamos</h3>
        <div className="row">
          <table className="col-lg-8 mx-auto table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Bicicleta</th>
              </tr>
            </thead>
            <tbody>
              {this.props.prestamos.map((prestamo, i) => {
                return (<Prestamo key={i} ind={i} prestamo={prestamo} user={this.props.user}/>)
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

class Perfil extends Component {

  render() {
    if (!this.props.user)
      return "Cargando"

    return (
      <div className="container">
        <h2 className="text-center text-uppercase text-secondary mb-0">Perfil del Usuario</h2>
        <hr className="star-dark mb-5" />

        <div className="row">
          <div className="col-lg-8 mx-auto">

            <div className="control-group">
              <div className="mb-0 pb-2 ">
                <h5>Nombre: </h5>
                <p>{this.props.user.name} {this.props.user.lastname} </p>
              </div>
            </div>

            <div className="control-group">
              <div className="mb-0 pb-2 ">
                <h5>Documento:</h5>
                <p>{this.props.user.id_code}</p>
              </div>
            </div>

            <div className="control-group">
              <div className="mb-0 pb-2 ">
                <h5>Correo electronico:</h5>
                <p>{this.props.user.email}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

class ComponentPageProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      prestamos: null,
      perfil: null,
    }

    let requestPerfil = `
    query{
      userById(token: "${props.user}"){
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

    let requestHistorial = `
    query{
      allPrestamos(token: "${props.user}"){
        id
        student_id
        bici_id
        solicitud
      }
    }`;

    GraphQLRequest(requestHistorial,
      data => {
        this.setState({ prestamos: data.allPrestamos })
      }
    );

  }

  perfil() {
    return (
      <section id="perfil" style={{ "paddingTop": "calc(6rem + 72px)" }}>
        <Perfil user={this.state.user} />
        <Historial prestamos={this.state.prestamos} user={this.props.user}/>
      </section>
    );
  }

  render() {
    if (this.props.isAuthenticated)
      return this.perfil();
    else
      return <Redirect to="/" />;
  }
}

const PageProfile = connect(
  state => ({
    isAuthenticated: state.authReducers.isAuthenticated,
    user: state.authReducers.user,
  })
)(ComponentPageProfile)

export default PageProfile;
