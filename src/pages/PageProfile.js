import React, { Component } from 'react';

class PageProfile extends Component {
    render() {
        return (

<section id="perfil" style={{ "paddingTop": "calc(6rem + 72px)" }}>
  <div className="container">
    <h2 className="text-center text-uppercase text-secondary mb-0">Perfil del Usuario</h2>
    <hr className="star-dark mb-5" />
    <div className="row">
      <div className="col-lg-8 mx-auto">
        <form name="sentMessage" id="contactForm" noValidate="novalidate">
          
          <div className="control-group">
            <div className="form-group floating-label-form-group controls mb-0 pb-2 text-center">
              <h5 className="text-center">Nombre</h5>
            </div>
          </div>
          
          <div className="control-group">
            <div className="form-group floating-label-form-group controls mb-0 pb-2 text-center">
              <h5 className="text-center">Apellido</h5>
            </div>
          </div>
          
          <div className="control-group">
            <div className="form-group floating-label-form-group controls mb-0 pb-2 text-center">
              <h5 className="text-center">Documento</h5>
            </div>
          </div>              
          
        </form>
      </div>
    </div>
  </div>
  
  <div className="container">
    <hr size="2px" color="black" />
    <h3 className="text-center text-uppercase text-secondary mb-0">Historial de Prestamos</h3>
    <div className="row">
      <div className="col-lg-8 mx-auto">
      </div>
    </div>
  </div>
  
</section>

        );
    }
}

export default PageProfile;
