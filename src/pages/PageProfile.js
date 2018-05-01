import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import GraphQLRequest from '../graphQLUtils';

class Prestamo extends Component {
  render() {

    return (
      <tr>
        <td>{this.props.consec}</td>
        {/* <td>{fecha.getDate()}/{fecha.getMonth() + 1}/{fecha.getFullYear()}</td> */}
        <td>Bicicleta: {this.props.prestamo.bici_id}</td>
      </tr>
    )
  }
}

class Historial extends Component {
  constructor(props) {
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
      function (data) { // SI fue exitosa la consulta
        data.allPrestamos.forEach((prestamo) => {
          if (prestamo.student_id === parseInt(props.identificacion, 10)) {
            prestamos.push(<Prestamo prestamo={prestamo} consec={consec} key={prestamo.id} />);
            consec++;
          }
        });
      },
      function (status, errors) {
        console.error(status);
      }
    );

    this.state = {
      prestamos,
    }

  }

  render() {
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

class Perfil extends Component {
  render(){
    return(
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
                <h5>Documento: {this.props.user.id_code}</h5>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

class ComponentPageProfile extends Component {

  perfil() {
    return (
      <section id="perfil" style={{ "paddingTop": "calc(6rem + 72px)" }}>
        <Perfil user={this.props.user} />
        <Historial identificacion={this.props.user.id} />
      </section>

    );
  }

  render() {
    if(this.props.isAuthenticated)
      return this.perfil();
    else
      return <Redirect to="/"/>;
  }
}

const PageProfile = connect(
  state => ({
    isAuthenticated: state.authReducers.isAuthenticated,
    user: state.authReducers.user,
  })
)(ComponentPageProfile)

export default PageProfile;
