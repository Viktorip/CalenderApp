import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Logout extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        if (localStorage.getItem('userName')) {
            localStorage.removeItem('userName');
            localStorage.removeItem('password');
        }
    }

    render() {

        return <div>
            <p>You are now logged out.</p>
            <p>Go back to <Link to="/">Calender</Link></p>
            </div>
    }
}