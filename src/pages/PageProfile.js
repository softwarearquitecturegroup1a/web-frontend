import React, { Component } from 'react';
import cookie from 'react-cookies';
import GraphQLRequest from '../graphQLUtils';

class Prestamo extends Component {
  constructor(props){
    super(props);
  }

  render(){

    var fecha = new Date(this.props.prestamo.solicitud);

    // let request = `
    // query{
    //   bicicletaById(serial: ${this.props.prestamo.bici_id}){
    //     serial
    //     marca
    //     color
    //     estado
    //   }
    // }`;    

    // var bicicleta;
    // GraphQLRequest(request,
    //   function (data) { // SI fue exitosa la consulta
    //     bicicleta = data.bicicletaById;
    //   },
    //   function (status, errors) {
    //     console.error(status);
    //   }
    // );

    return (
      <tr>
        <td>{this.props.consec}</td>
        <td>{fecha.getDate()}/{fecha.getMonth() + 1}/{fecha.getFullYear()}</td>
        <td>Bicicleta: {this.props.prestamo.bici_id}</td>
      </tr>
    )
  }
}

class Historial extends Component {
  constructor(props){
    super(props);

    let request = `
    query{
      allPrestamos{
        id
        student_id
        bici_id
        solicitud
      }
    }`;

    var prestamos = [];
    var consec = 1;
    GraphQLRequest(request,
      function(data){ // SI fue exitosa la consulta
        data.allPrestamos.forEach((prestamo)=>{
          if (prestamo.student_id === parseInt(props.identificacion)){
            prestamos.push(<Prestamo prestamo={prestamo} consec={consec} key={prestamo.id}/>);
            consec++;
          }
        });
      },
      function(status, errors){
        console.error(status);
      }
    );

    this.state = {
      prestamos,
    }

  }

  render(){
    return (
      <div className="container">
        <hr size="2px" color="black" />
        <h3 className="text-center text-uppercase text-secondary mb-0">Historial de Prestamos</h3>
        <div className="row">
          <table className="col-lg-8 mx-auto">
            <thead>
              
            </thead>
            <tbody>
              {this.state.prestamos}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}


class PageProfile extends Component {

  constructor(props){
    super(props)
    this.state = {
      nombre: cookie.load("nombre"),
      apellido: cookie.load("apellido"),
      identificacion: cookie.load("identificacion"),
    }
  }

  render() {
    return (

      <section id="perfil" style={{ "paddingTop": "calc(6rem + 72px)" }}>
        <div className="container">
          <h2 className="text-center text-uppercase text-secondary mb-0">Perfil del Usuario</h2>
          <hr className="star-dark mb-5" />
          <div className="row">
            <div className="col-lg-8 mx-auto">

              <div className="control-group">
                <div className="form-group floating-label-form-group controls mb-0 pb-2 text-center">
                  <h5 className="text-center">{this.state.nombre}</h5>
                </div>
              </div>

              <div className="control-group">
                <div className="form-group floating-label-form-group controls mb-0 pb-2 text-center">
                  <h5 className="text-center">{this.state.apellido}</h5>
                </div>
              </div>

              <div className="control-group">
                <div className="form-group floating-label-form-group controls mb-0 pb-2 text-center">
                  <h5 className="text-center">Documento: {this.state.identificacion }</h5>
                </div>
              </div>

            </div>
          </div>
        </div>

        <Historial identificacion={this.state.identificacion}/>

      </section>

    );
  }
}

export default PageProfile;
