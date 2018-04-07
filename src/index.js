import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import PageContent from './PageContent';
import Footer from './Footer';
import registerServiceWorker from './registerServiceWorker';


class App extends Component {
    render() {
        return (
            <div id="page-top" className="App">
                <NavBar />
                <PageContent />
                <Footer/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
