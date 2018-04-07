import React, { Component } from 'react';

class Localizacion extends Component {
    render(){
        return(
            <div className="col-md-4 mb-5 mb-lg-0">
                <h4 className="text-uppercase mb-4">Localizacion</h4>
                <p className="lead mb-0">Carrera 45 # 26-85, Edif. Uriel Gutiérrez.
                    <br />Bogotá D.C.,  Colombia</p>
            </div>
        );
    }
}

class Footer extends Component {
    render() {
        return (
    <footer class="footer text-center">
        <div class="container">
            <div class="row">
                <Localizacion/>
                <div class="col-md-4 mb-5 mb-lg-0">
                    <h6 class="text-uppercase mb-4">El uso de bicicletas no es perjudicial para la salud. Fomentese la realizacion de actividades fisicas en los menores de edad.</h6>
                    <img class="img-fluid mb-5 d-block mx-auto" src="img/bike-white.png" style={{ width: "50%"}} alt=""/>
                </div>

                <div class="col-md-4">
                    <h4 class="text-uppercase mb-4">Sobre Bici-UN</h4>
                    <p class="lead mb-0">Es un proyecto de clase creado por el equipo 1A, para el curso 
                    <a href="http://sa.javergarav.academy"> Arquitectura de software</a>.</p>
                </div>
            </div>
        </div>
    </footer>
        );
    }
}

export default Footer;
