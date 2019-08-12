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
                    <Link to='/login' className="">Login </Link>
                    <Link to='/register' className=""> Register</Link>
                </nav>
                <br />
                <main>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </main>
            </div>
        </Router>
    }
}