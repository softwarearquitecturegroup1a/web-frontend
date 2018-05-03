import React, { Component } from 'react';
import { Route } from 'react-router'

import NavBar from './NavBar';
import Footer from './Footer';

import PageHome from '../pages/PageHome'
import PageLogin from '../pages/PageLogin'
import PageProfile from '../pages/PageProfile'
import PageDeliver from '../pages/pageDeliver'
import PageRequest from '../pages/pageRequest'

class App extends Component {
    render() {
        return (
            <div id="page-top" className="App">
                <NavBar />
                <Route path="/" exact component={PageHome} />
                <Route path="/login" component={PageLogin} />
                <Route path="/perfil" component={PageProfile} />
                <Route path="/prestamo" component={PageRequest} />
                <Route path="/timer" component={PageDeliver} />
                <Footer />
            </div>
        );
    }
}

export default App;