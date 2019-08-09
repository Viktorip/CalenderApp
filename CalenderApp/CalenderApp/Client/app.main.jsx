import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Login } from './app.login';
import { Register } from './app.register';

export class Main extends React.Component{

    render(){
        return <Router>
            <div>
                <header>
                    <h1></h1>  
                </header>
                <nav>
                    
                </nav>
                <br />
                <main>
                    <Register />
                </main>
            </div>
        </Router>
    }
}