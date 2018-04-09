import React, { Component } from 'react';

import NavBarLogin from './NavBarLogin';
import Footer from './Footer';

class AppLogin extends Component {
    render() {
        return (
            <div id="page-top" className="AppLogin">
                <NavBarLogin />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default AppLogin;