import React, { Component } from 'react';
import { Checkbox } from './app.checkbox';
import { HTTP } from './http';

export class Register extends Component {

    constructor(props) {
        super(props);
        this.makeCheckbox = this.makeCheckbox.bind(this);
        this.checkBoxChange = this.checkBoxChange.bind(this);
        this.categories = ["Kaikki tapahtumat", "Musiikki", "Museot", "Teatteri", "Leffat", "Urheilu", "Lapsille", "Ruoka ja Juoma", "Muut menot"];
    }

    componentDidMount() {
        const d = "2019-08-14";
        HTTP.post('/api/calenderevents', d).then(calenderevents => {
            console.log("got events");
        });
    }

    makeCheckbox(label) {
        return <Checkbox label={label} handleCheckboxChange={this.checkBoxChange} key={label} />
    }

    checkBoxChange(label) {
        console.log("toggled: " + label);
    }

    render() {
        let boxes = this.categories.map(b => this.makeCheckbox(b));

        return <div>
            <h1>Register</h1>
            <form>
                <label htmlFor="NickName">Account name </label>
                <input type="text" name="NickName" placeholder="Name here..." onChange={this.onValueChange} />
                <br />
                <label htmlFor="Password">Password </label>
                <input name="Password" placeholder="Password here..." onChange={this.onValueChange} />
                <br />
                <br />
                {boxes}
                <br />
                <br />
                <button type="button" onClick={this.onLoginSubmit}>Register</button>
            </form>
            </div>
    }
}