import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import glRequest from '../graphQLUtils';

class Timer extends Component{
  
  constructor(props) {
    super(props)
    this.state = { secondsElapsed: 0 }
  }

  tick() {
    this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
  }

  componentDidMount() {
    this.interval = setInterval( () => {
      this.setState({ secondsElapsed: this.state.secondsElapsed + 1 })
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let pedido = new Date(this.props.start);
    let entrega = new Date();
    let tiempo = parseInt( (entrega - pedido) / 60000 )
    let color = tiempo > 15 ? "#F00": "#FFF";

    return (
      <div>
        <h2 className="text-center text-uppercase text-white">Tu tiempo es:</h2>
        <h2 style={{color: color}} className="text-center text-uppercase">{tiempo}</h2>
        <h2 className="text-center text-uppercase text-white">minutos</h2>
        <hr className="star-light mb-5"></hr>
      </div>
      
    );
  }
}

class ComponentPageDeliver extends Component {
  constructor(props){
    super(props)
    this.state = {
      pendientes: [],
      solicitud: ""
    }
  }

  componentDidMount(){
    var request = `
    {
      prestamosPendientes(token: "${this.props.user}"){
        id
        bici_id
        solicitud
      }
    }`;

    glRequest(request,
      data => {
        if (!data.prestamosPendientes) {
          return;
        }
        if (data.prestamosPendientes.length <= 0){
          return;
        }

        this.setState({ 
          pendientes: data.prestamosPendientes,
          solicitud: data.prestamosPendientes[0].solicitud
        })
      }
    )
  }

  sinPendientes(){
    return (
      <div>
        <h2 className="text-center text-uppercase text-white">Esperamos hayas disfrutado nuestro servicio.</h2>
        <hr className="star-light mb-5"></hr>
      </div>
    )
  }

  handleClick(event){
    
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (this.state.pendientes.length == 0){
      return this.sinPendientes();
    }
    
    const solicitud = this.state.pendientes[0].solicitud
    const biciId = this.state.pendientes[0].bici_id
    const start = this.state.solicitud
    console.log(start)

    return (
      <section className="bg-info text-white mb-0" id="about" style={{ "paddingTop": "calc(6rem + 72px)" }}>
        <div className="container">
          
          <Timer start={start}/>

          <div className="text-center">
            <p className="lead text-center">Recuerda no exceder el tiempo de tu prestamo. El servicio es para todos.</p>
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-xl btn-outline-light" style={{ width: 200, height: 60 }} onClick={this.handleClick.bind(this)}>
              <i className="fa fa-download mr-2"></i>
              Entregar
            </button>
          </div>
        </div>
      </section>
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