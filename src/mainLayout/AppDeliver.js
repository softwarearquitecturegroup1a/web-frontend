import React, { Component } from 'react';

import NavBarDeliver from './NavBarDeliver';
import Footer from './Footer';

class AppDeliver extends Component {
    render() {
        return (
            <div id="page-top" className="AppDeliver">
                <NavBarDeliver />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default AppDeliver;