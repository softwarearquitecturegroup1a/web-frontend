import React, { Component } from 'react';

class PageRequest extends Component {
    render() {
        return (
            <section id="request">
                <div class="container">
                    <h2 class="text-center text-uppercase text-secondary mb-0">Inicia tu viaje</h2>
                    <hr class="star-dark mb-5" />
                    <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <form name="sentMessage" id="contactForm" novalidate="novalidate">
                        <div class="control-group">
                            <div class="form-group floating-label-form-group controls mb-0 pb-2 text-center">
                            <h5 class="text-center">Estacion de inicio</h5>
                            <select class="form-control text-center" id="start" required="required">
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
                            <select class="form-control text-center" id="end" required="required">
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
                            <button type="submit" class="btn btn-primary btn-xl" id="sendMessageButton">Solicitar</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </section>



        );
    }
}

export default PageRequest;
