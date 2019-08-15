import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class UserNav extends Component {

    constructor(props) {
        super(props);
        this.state = { showingUser: false };
    }

    createUserElement(show) {
        if (show) {
            const userlink = "/user/" + sessionStorage.getItem('userId');
            return <span>Welcome, <Link to={userlink}>{sessionStorage.getItem('userName')}</Link> <Link to='/logout' onClick={this.handleLogOut}> Logout</Link></span>
        } else {
            return <Link to="/login">Login</Link>
        }
    }

    handleLogOut() {
        console.log("logging out");
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userId');
    }

    render() {

        let area = (sessionStorage.getItem('userName')) ? this.createUserElement(true) : this.createUserElement(false);

        return <span>{area}</span>
    }
}