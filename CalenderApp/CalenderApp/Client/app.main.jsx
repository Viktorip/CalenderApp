import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Login } from './app.login';
import { Register } from './app.register';
import { CalendarContainer } from './app.calendarcontainer';
import { UserNav } from './app.userNav';
import { Logout } from './app.logout';
import { CalenderEvent } from './app.calenderevent';
import { UserProfile } from './app.userprofile';
import { AddEventForm } from './app.addeventform';

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
                    <Link className='navButton' to='/'>Kalenteri</Link>
                    <span className='navButton'>Kirjainmerkit</span> 
                    <Link className='navButton' to='/login'>Subscriptions</Link>
                    <Link className='navButton' to='/addevent'>Lisää tapahtuma</Link>
                    <UserNav />
                </nav>
                <br/>
                <main>
                    <Switch>
                        <Route exact path="/" component={CalendarContainer} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/addevent" component={AddEventForm} />
                        <Route exact path="/event/:eventId" component={CalenderEvent} />
                        <Route exact path="/user/:userId" component={UserProfile} />
                    </Switch>
                </main>
            </div>
        </Router>
    }
}