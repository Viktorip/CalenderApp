import React, { Component } from 'react';
import { HTTP } from './http';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { currentUser: {}, NickName:"", Password:"", loggedIn: false, errorMsg: "" };
        this.onValueChange = this.onValueChange.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
    }

    componentDidMount() {
        
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
                        console.log("Success! Welcome ", currentUser.nickName, currentUser.id);
                        sessionStorage.setItem('NickName', currentUser.nickName);
                        sessionStorage.setItem('UserId', currentUser.id);
                        this.setState({ errorMsg: `Welcome ${currentUser.nickName}!` });
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
        let user = this.state.currentUser;
        let msg = "";
        if (!this.checkIfValidUser(user)) {
            msg = "User not found";
        } else {
            msg = "Success! Welcome " + user.nickName;
        }
        return <div>
            
            <h1>Login</h1>
            <form>
                <label htmlFor="NickName">Name </label>
                <input type="text" name="NickName" placeholder="Name here..." onChange={this.onValueChange} />
                <br />
                <label htmlFor="Password">Password </label>
                <input name="Password" placeholder="Password here..." onChange={this.onValueChange} />
                <br />
                <button type="button" onClick={this.onLoginSubmit}>Login</button>
            </form>
            <p>{this.state.errorMsg}</p>
        </div>
    }
}