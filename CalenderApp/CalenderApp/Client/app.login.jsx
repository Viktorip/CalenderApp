﻿import React, { Component } from 'react';
import { HTTP } from './http';
import { Link } from 'react-router-dom';
import { Checkbox } from './app.checkbox';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { currentUser: {}, NickName:"", Password:"", loggedIn: false, errorMsg: "", rememberMe: false };
        this.onValueChange = this.onValueChange.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
    }

    componentDidMount() {
        //console.log("path is:", this.props.location.pathname);
    }

    onLoginSubmit() {
        console.log("login clicked");
        if (this.state.NickName != "" && this.state.Password != "") {
            HTTP.post('/api/users/getuser', { NickName: this.state.NickName, Password: this.state.Password })
                .then(currentUser => {
                    this.setState({ currentUser });
                    if (!this.checkIfValidUser(this.state.currentUser)) {
                        console.log("User not found");
                        this.setState({ errorMsg: "User not found!" });
                    } else {
                        console.log("Success! Welcome ", currentUser.nickName, currentUser.id, currentUser.password, this.state.rememberMe);
                        this.setState({ errorMsg: `Welcome ${currentUser.nickName}!` });
                        sessionStorage.setItem('userName', currentUser.nickName);
                        sessionStorage.setItem('userId', currentUser.id);
                        console.log("hash", currentUser.hash);
                        if (this.state.rememberMe) {
                            localStorage.setItem('userName', currentUser.nickName);
                            localStorage.setItem('password', currentUser.password);

                        }
                        
                        this.props.history.push('/');
                    }
                });
        } else {
            console.log("Cant have empty name or password!");
            this.setState({ errorMsg: 'Error! Empty name or password!' });
        }
        
    }

    onValueChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    checkIfValidUser(user) {
        if (user.nickName == "") {
            return false;
        } else if (user.nickName != null) {
            return true;
        }
    }

    render() {
        
        return <div className="loginBox">
            <div>
                <span className="login">Kirjaudu palveluun</span>
                <form>
                    <br />
                    <label htmlFor="NickName">Tunnus</label>
                    <br />
                    <input type="text" name="NickName" placeholder="Tunnus..." onChange={this.onValueChange} />
                    <br />
                    <br />
                    <label htmlFor="Password">Salasana</label>
                    <br />
                    <input name="Password" type="password" placeholder="Salasana..." onChange={this.onValueChange} />
                    <br />
                    <br />
                    <button type="button" onClick={this.onLoginSubmit}>Kirjaudu</button>
                    <Checkbox label="Muista minut" handleCheckboxChange={() => this.state.rememberMe = !this.state.rememberMe} />
                </form>
                <p>{this.state.errorMsg}</p>
                <p>Ei tunnusta? <Link to='/register'>Luo tunnus</Link></p>
            </div>
        </div>
    }
}