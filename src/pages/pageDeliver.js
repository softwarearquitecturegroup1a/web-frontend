import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import GraphQLRequest from '../graphQLUtils';

class Deliver extends Component {
    constructor(props) {
        super(props)
        this.state = {
          perfil: null,
        }  
      
    }

    handleSubmit(event){
        event.preventDefault();

        console.log("submit data")

        let requestPendientes = `
        query{
            prestamosPendientes(token: "${this.props.user}"){
              bici_id
              student_id
              id
              entrega
            }
        }`;

        GraphQLRequest(requestPendientes,
            data => {
                var otr = data.prestamosPendientes.id;
                console.log(otr)
                localStorage.setItem("pres",data.prestamosPendientes.id)
            }
            
        );

        console.log(localStorage.getItem("pres").bici_id)

            let requestEntregar = `
            mutation{
                entregarPrestamo(token: "${this.props.user}", id:${localStorage.getItem("pres").id}){
                bici_id
                }
            }`;
            
            GraphQLRequest(requestEntregar,
                data => {
                console.log(data.entregarPrestamo.bici_id)
                }
            );

            localStorage.removeItem("pres")
        

    }
    render() {
        return (
            <section className="bg-info text-white mb-0" id="about" style={{ "paddingTop": "calc(6rem + 72px)" }}>
                <div className="container">
                    <h2 className="text-center text-uppercase text-white">Esperamos hayas disfrutado nuestro servicio.</h2>
                    <hr className="star-light mb-5"></hr>
        
                    <div className="text-center">
                        <p className="lead text-center">Recuerda no exceder el tiempo de tu prestamo. El servicio es para todos.</p>
                    </div>

                    <form name="sentMessage" id="contactForm" noValidate="novalidate" onSubmit={this.handleSubmit.bind(this)} action="/">
                        <div className="form-group text-center">
                            <a className="portfolio-item d-block mx-auto" href="#">
                                <button type="submit" className="btn btn-primary btn-xl" id="sendMessageButton" href="#bicishow">Entregar</button>
                            </a>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}
class ComponentPageDeliver extends Component{

    constructor(props) {
        super(props)
        this.state = {
          perfil: null,
        }  
      
    }

    render() {
        if(!this.props.isAuthenticated)
          return <Redirect to="/" />;
        return (
            <Deliver user={this.props.user}/>
                
        );
      }

}

const PageDeliver = connect(
    state => ({
      isAuthenticated: state.authReducers.isAuthenticated,
      user: state.authReducers.user,
    })
  )(ComponentPageDeliver)

export default PageDeliver;