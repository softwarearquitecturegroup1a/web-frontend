import React, { Component } from 'react';

class BikeAnim extends Component {
  render() {
    return (
      <div className="wrap">
        <div className="bike">
          <div className="wheel-back"></div>
          <div className="center-circle"></div>
          <div className="wheel-front"></div>
          <div className="rod rod1"></div>
          <div className="rod rod2"></div>
          <div className="rod rod3"></div>
          <div className="rod rod4"></div>
          <div className="rod rod5"></div>
          <div className="rod rod6"></div>
          <div className="seat"></div>
          <div className="handle"></div>
          <div className="foot-plate"></div>
        </div>
      </div>
    )
  }
}

class PageHome extends Component {
  render() {
    return (
      <header className="masthead bg-info text-white text-center">
        <div className="container">
          <BikeAnim />
          <h1 className="text-uppercase mb-0">Bici-UN</h1>
          <hr className="star-light" />
          <h2 className="font-weight-light mb-0">Sabemos que llegar a tiempo no es tarea facil. Nosotros te ayudamos.</h2>
        </div>
      </header>
    );
  }
}

export default PageHome;
