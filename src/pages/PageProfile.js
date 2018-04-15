import React, { Component } from 'react';
import cookie from 'react-cookies'

class Historial extends Component {
  render(){
    return (
      <div className="container">
        <hr size="2px" color="black" />
        <h3 className="text-center text-uppercase text-secondary mb-0">Historial de Prestamos</h3>
        <div className="row">
          <div className="col-lg-8 mx-auto">
          </div>
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

        <Historial/>

      </section>

    );
  }
}

export default PageProfile;
