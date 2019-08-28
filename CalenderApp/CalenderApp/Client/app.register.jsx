import React, { Component } from 'react';
import { Checkbox } from './app.checkbox';
import { HTTP } from './http';

export class Register extends Component {

    constructor(props) {
        super(props);
        
        this.onValueChange = this.onValueChange.bind(this);
        this.makeCheckbox = this.makeCheckbox.bind(this);
        this.checkBoxChange = this.checkBoxChange.bind(this);
        this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
        this.categories = { "Musiikki": false, "Museot": false, "Teatteri": false, "Leffat": false, "Urheilu": false, "Lapsille": false, "Ruoka ja Juoma": false, "Muut menot": false };
        this.boxes = [];
        Object.keys(this.categories).forEach(b => {
            this.boxes.push(this.makeCheckbox(b.toString()));
        });
        this.state = { NickName: "", Password: "", Email: "", errorMsg: "" };
    }

    componentDidMount() {
        /*
        //just testing connection
        const d = "2019-08-14";
        HTTP.post('/api/calenderevents', d).then(calenderevents => {
            console.log("got events", JSON.stringify(calenderevents[0])); //returns array with one object
        });
        */
        
    }

    onValueChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state.NickName);
    }

    makeCheckbox(label) {
        return <Checkbox label={label} handleCheckboxChange={this.checkBoxChange} key={label} />
    }

    checkBoxChange(label, isChecked) {
        this.categories[label] = isChecked;
        console.log("toggled: ", label, isChecked);
    }

    onRegisterSubmit() {
        /*
        Object.keys(this.categories).forEach(b => {
            console.log("Checked? ", b, this.categories[b]);
        });
        */
        const newuser = {
            NickName: this.state.NickName,
            Password: this.state.Password,
            Email: this.state.Email,
            Categories: JSON.stringify(this.categories)
        };
        if (this.validateEmail(newuser.Email)) {
            if (this.state.NickName != "" && this.state.Password != "") {
                HTTP.post('/api/users/newuser', newuser).then(user => {
                    console.log("Made new user: ", JSON.stringify(user));
                    this.props.history.push('/login');
                });
                console.log("Valid form");
            } else {
                console.log("Invalid name or password!");
                this.setState({ errorMsg: "Invalid name or password!" });
                
            }
        } else {
            console.log('Invalid email!');
            this.setState({ errorMsg: "Invalid email!" });

        };
        
    }

    validateEmail(email) {
        console.log("Checking", email);
        const val = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
        const reg = new RegExp(val);
        return reg.test(email);
    }

    render() {
        

        return <div className="loginBox" className="registerBox">
            <span className="register">Syötä tietosi</span>
            <form>
                <div className="registerForm">
                    <br />
                    <label htmlFor="NickName">Tunnus </label>
                    <br />
                    <input className="regInputField" type="text" name="NickName" placeholder="Tunnus..." onChange={this.onValueChange} />
                    <br />
                    <br />
                    <label htmlFor="Password">Salasana </label>
                    <br />
                    <input className="regInputField"  name="Password" placeholder="Salasana..." onChange={this.onValueChange} />
                    <br />
                    <br />
                    <label htmlFor="Email">Sähköposti </label>
                    <br />
                    <input className="regEmailField" name="Email" placeholder="nimi@mail.com ..." onChange={this.onValueChange} />
                    <br />
                    <br />
                    <label htmlFor="categories">Valitse kiinnostavat tapahtumat </label>
                    <div className="checkBoxex" name="categories">{this.boxes}</div>                    
                    <br />
                    <button type="button" onClick={this.onRegisterSubmit}>Luo tunnus</button>
                    
                </div>
            </form>
            <h1>{this.state.errorMsg}</h1>
            </div>
    }
}