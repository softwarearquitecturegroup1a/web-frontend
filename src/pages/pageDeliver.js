import React, { Component } from 'react';

class PageDeliver extends Component {
    render() {
        return (
            <section class="bg-info text-white mb-0" id="about">
                <div class="container">
                    <h2 class="text-center text-uppercase text-white">Esperamos hayas disfrutado nuestro servicio.</h2>
                    <hr class="star-light mb-5"></hr>
        
                    <div class="text-center">
                        <p class="lead text-center">Recuerda no exceder el tiempo de tu prestamo. El servicio es para todos.</p>
                    </div>
        
                    <div class="text-center mt-4">
                        <a class="btn btn-xl btn-outline-light" style={{width: 200, height: 60}} href="/">
                        <i class="fa fa-download mr-2"></i>
                            Entregar
                        </a>
                    </div>
                </div>
            </section>
        );
    }
}

export default PageDeliver;