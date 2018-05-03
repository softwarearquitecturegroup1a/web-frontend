import React, { Component } from 'react';

class PageDeliver extends Component {
    render() {
        return (
            <section className="bg-info text-white mb-0" id="about" style={{ "paddingTop": "calc(6rem + 72px)" }}>
                <div className="container">
                    <h2 className="text-center text-uppercase text-white">Esperamos hayas disfrutado nuestro servicio.</h2>
                    <hr className="star-light mb-5"></hr>
        
                    <div className="text-center">
                        <p className="lead text-center">Recuerda no exceder el tiempo de tu prestamo. El servicio es para todos.</p>
                    </div>
        
                    <div className="text-center mt-4">
                        <a className="btn btn-xl btn-outline-light" style={{width: 200, height: 60}} href="/">
                        <i className="fa fa-download mr-2"></i>
                            Entregar
                        </a>
                    </div>
                </div>
            </section>
        );
    }
}

export default PageDeliver;