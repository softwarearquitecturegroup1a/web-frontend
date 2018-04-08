import React, { Component } from 'react';

import NavBar from './NavBar';
import Footer from './Footer';

class App extends Component {
    render() {
        return (
            <div id="page-top" className="App">
                <NavBar />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default App;