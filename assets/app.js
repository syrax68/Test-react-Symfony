import React from 'react'
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import { HashRouter, Switch, Route } from 'react-router-dom';
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import authApi from './helpers/auth.api';

authApi.setup();
const App = () =>{
    return (
    <HashRouter>
        <Navbar />
        <div className='container pt-5'>
            <Switch>
                <Route path="/login" component={LoginPage} />  
                <Route path="/users" component={UserPage} />
                <Route path="/" component={HomePage} /> 
            </Switch>
        </div>
    </HashRouter>
    )
    
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement)
