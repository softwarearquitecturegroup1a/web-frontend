import React, { Component } from 'react';
import GlRequest from '../graphQLUtils';
import cookie from 'react-cookies'

class Request extends Component{
    constructor(props){
        super(props);
        this.state = {
            start: '',
            end:''
            
        };

        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleStartChange(event){
        this.setState({start: event.target.value});
                
    }

    handleEndChange(event){
        this.setState({end: event.target.value});
                
    }

    handleSubmit(event){
        event.preventDefault();
        const start = this.state.start;
        const end = this.state.end;

        var getbike = `query{
            bicicletaById(serial: 21325456){
              serial
            }
          }`

        GlRequest(getbike,
        (data)=> {
            cookie.save('bicicleta', data.bicicletaById.serial, { path: '/', });
        }, 
        (status, data) => {
          
        });

        var bike = cookie.load('bicicleta')

        var updbike = `mutation{
            updateBicicleta(serial: ${bike}, bicicleta:{
              estado: "Ocupada"
              ubicacion: ${end}
            }){
              estado
              ubicacion
            }
        }`

        GlRequest(updbike,
            (data)=> {
                cookie.save('estado', data.updateBicicleta.estado, { path: '/', });
                cookie.save('ubicacion', data.updateBicicleta.ubicacion, { path: '/', });
            }, 
            (status, data) => {
              
            });

        var insertion = `mutation{
            createPrestamo(prestamo:{
              student_id: ${cookie.load('identificacion')}
              bici_id: ${cookie.load('bicicleta')}
              solicitud: ${new Date()}
            }){
              solicitud
            }
          
        }`

        GlRequest(insertion,
            (data)=> {
                cookie.save('solicitud', data.createPrestamo.solicitud, { path: '/', });
            }, 
            (status, data) => {
              
            });
        
        

        
    }

    render(){
        return(
            

            <form name="sentMessage" id="contactForm" novalidate="novalidate" onSubmit={this.handleSubmit.bind(this)} action="/">
                        <div class="control-group">
                            <div class="form-group floating-label-form-group controls mb-0 pb-2 text-center">
                            <h5 class="text-center">Estacion de inicio</h5>
                            <select class="form-control text-center" value={this.state.start} id="start" onChange={this.handleStartChange.bind(this)} required="required">
                                <option>Edificio CyT</option>
                                <option>Entrada Calle 26</option>
                                <option>Entrada Edificio Uriel Gutierrez</option>
                                <option>Entrada Calle 53</option>
                                <option>Entrada Calle 45</option>
                            </select>
                            <p class="help-block text-danger"></p>
                            </div>
                        </div>
                        <div class="control-group">
                            <div class="form-group floating-label-form-group controls mb-0 pb-2 text-center">
                            <h5 class="text-center">Estacion de destino</h5>
                            <select class="form-control text-center" value={this.state.end} id="end" onChange={this.handleEndChange.bind(this)} required="required">
                                <option>Edificio CyT</option>
                                <option>Entrada Calle 26</option>
                                <option>Entrada Edificio Uriel Gutierrez</option>
                                <option>Entrada Calle 53</option>
                                <option>Entrada Calle 45</option>
                            </select>
                            <p class="help-block text-danger"></p>
                            </div>
                        </div>
                        <br />
                        <div id="success"></div>
                        <div class="form-group text-center">
                        <a class="portfolio-item d-block mx-auto" href="#bicishow">
                            <button type="submit" class="btn btn-primary btn-xl" id="sendMessageButton" href="#bicishow">Solicitar</button>
                        </a>
                        </div>
                        </form>

        )
    }
}
class PageRequest extends Component {
    render() {

        var bicid = cookie.load('bicicleta')
        return (
            <section id="request" style={{ "paddingTop": "calc(6rem + 72px)" }} >
                <div class="container">
                    <h2 class="text-center text-uppercase text-secondary mb-0">Inicia tu viaje</h2>
                    <hr class="star-dark mb-5" />
                    <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <Request />
                    </div>
                    </div>
                </div>
                

                <div class="portfolio-modal mfp-hide" id="bicishow">
                <div class="portfolio-modal-dialog bg-white">
                    <a class="close-button d-none d-md-block portfolio-modal-dismiss" data-dismiss="modal" href="#">
                         <i class="fa fa-3x fa-times"></i>
                    </a>
                    <div class="container text-center">
                        <div class="row">
                            <div class="col-lg-8 mx-auto">
                                <h2 class="text-secondary text-uppercase mb-0">Tu bici es la:</h2>
                                <hr class="star-dark mb-5" /> 
                                    <h5 class="mb-5"> {bicid} </h5>
                                <a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" data-dismiss="modal" href="#">
                                <i class="fa fa-close"></i>
                                ¡Vamos!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            </section>

            



        );
    }
}

export default PageRequest;
