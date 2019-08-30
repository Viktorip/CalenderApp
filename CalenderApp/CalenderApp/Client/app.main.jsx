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
import { HTTP } from './http';

export class Main extends React.Component{

    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        const user = localStorage.getItem("userName");
        const pass = localStorage.getItem("password");

        if (user) {
            console.log("user found in storage: ", user, pass);
            HTTP.post('/api/users/getuser', { NickName: user, Password: pass })
                .then(currentUser => {
                    console.log("Started session with", user, JSON.stringify(currentUser));
                    sessionStorage.setItem('userName', currentUser.nickName);
                    sessionStorage.setItem('userId', currentUser.id);
                    this.forceUpdate();
                });
        } else {
            console.log("No user in local storage");
        }
    }

    render() {       
        return <Router>
            <div>
                <header>
                </header>
                <nav className="navContainer">
                    <div className="mainNav">
                        <Link className='navButton' to='/'>Kalenteri</Link>
                        <span className='navButton'>Kirjainmerkit</span> 
                        <Link className='navButton' to='/login'>Subscriptions</Link>
                        <Link className='navButton' to='/addevent'>Lisää tapahtuma</Link>
                        <UserNav />
                    </div>
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