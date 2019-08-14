import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Login } from './app.login';
import { Register } from './app.register';
import { CalendarContainer } from './app.calendarcontainer';
import { UserNav } from './app.userNav';
import { Logout } from './app.logout';

export class Main extends React.Component{

    constructor(props) {
        super(props);
        
    }

    render() {


        return <Router>
            <div>
                <header>
                    <h1></h1>  
                </header>
                <nav>
                    <Link to='/main' className="">Calender </Link>
                    <UserNav />
                </nav>
                <br />
                <main>
                    <Switch>
                        <Route exact path="/" component={CalendarContainer} />
                        <Route path="/main" component={CalendarContainer} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                    </Switch>
                </main>
            </div>
        </Router>
    }
}