import React, { Component } from 'react';
import { HTTP } from './http';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { currentUser: {}, NickName:"", Password:"" };
        this.onValueChange = this.onValueChange.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
    }

    componentDidMount() {
        
    }

    onLoginSubmit() {
        console.log("login clicked");
        HTTP.post('/api/users/getuser', { NickName: this.state.NickName, Password: this.state.Password })
            .then(currentUser => {
                this.setState({ currentUser });
                console.log("here");
            });
    }

    onValueChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        let pass = this.state.currentUser;
        let msg = "";
        if (pass.nickName == "Anonymous" || pass.nickName == "") {
            msg = "User not found";
        } else if (pass.nickName != "Anonymous" && pass.nickName != null) {
            msg = "Success! Welcome " + pass.nickName;
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
            <p>{msg}</p>
        </div>
    }
}