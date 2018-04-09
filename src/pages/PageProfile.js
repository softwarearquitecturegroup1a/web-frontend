import React, { Component } from 'react';

class PageProfile extends Component {
    render() {
        return (

<section id="perfil" style={{ "paddingTop": "calc(6rem + 72px)" }}>
  <div class="container">
    <h2 class="text-center text-uppercase text-secondary mb-0">Perfil del Usuario</h2>
    <hr class="star-dark mb-5" />
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <form name="sentMessage" id="contactForm" novalidate="novalidate">
          <div class="control-group">
            <div class="form-group floating-label-form-group controls mb-0 pb-2 text-center">
              <h5 class="text-center">Nombre</h5>
            </div>
          </div>
          
          <div class="control-group">
            <div class="form-group floating-label-form-group controls mb-0 pb-2 text-center">
              <h5 class="text-center">Apellido</h5>
            </div>
          </div>
          
          <div class="control-group">
            <div class="form-group floating-label-form-group controls mb-0 pb-2 text-center">
              <h5 class="text-center">Documento</h5>
            </div>
          </div>              
        </form>
      </div>
    </div>
  </div>
  
  <div class="container">
    <hr size="2px" color="black" />
    <h3 class="text-center text-uppercase text-secondary mb-0">Historial de Prestamos</h3>
    <div class="row">
      <div class="col-lg-8 mx-auto">
      </div>
    </div>
  </div>
  
</section>

        );
    }
}

export default PageProfile;
