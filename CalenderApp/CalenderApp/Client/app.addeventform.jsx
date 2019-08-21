import React, { Component } from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import { HTTP } from './http';


export class AddEventForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date()
        };
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.getFormResults = this.getFormResults.bind(this);
        this.handleFormData = this.handleFormData.bind(this);

        this.eventCategoryList = ['Musiikki', 'Museot', 'Teatteri', 'Vapaa-aika', 'Urheilu', 'Lapsille', 'Ruoka ja Juoma', 'Muut menot'];
    }

    componentDidMount() {
        const main_form = document.getElementById('addevent-form');
        main_form.addEventListener('submit', this.handleFormData);
    }

    handleStartChange(date) {
        this.setState({
            startDate: date
        });
        
    }

    handleEndChange(date) {
        this.setState({
            endDate: date
        });

    }

    createCategoryList(item) {
        return <option key={item} value={item}>{item}</option>
    }

    createTimesList() {
        const x = 30; //minutes interval
        let times = []; // time array
        let tt = 0; // start time

        //loop to increment the time and push results in array
        for (let i = 0; tt < 24 * 60; i++) {
            let hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
            let mm = (tt % 60); // getting minutes of the hour in 0-55 format
            times[i] = times[i] = ("0" + hh).slice(-2) + ':' + ("0" + mm).slice(-2); // push to array in [00:00 - 24:00] format
            tt = tt + x;
        }

        const timelist = times.map(t => {
            return <option key={t} value={t}>{t}</option>
        });

        return timelist;
    }

    handleFormData(event) {
        event.preventDefault();
        
        const formElements = this.getFormResults(document.getElementById('addevent-form'));

        formElements['BeginningDateTime'] += ' ' + formElements['Time'] + ':00';
        delete formElements['Time'];
        
        HTTP.post('/api/calenderevents/create', formElements).then(ce => {
            console.log("ce", JSON.stringify(ce));
            this.props.history.push('/event/' + ce.id);
        });
        
    }

    setOrPush(target, val) {
        let result = val;
        if (target) {
            result = [target];
            result.push(val);
        }
        return result;
    }
    
    getFormResults(formElement) {
        const formElements = formElement.elements;
        let formParams = {};
        let i = 0;
        let elem = null;
        for (i = 0; i < formElements.length; i += 1) {
            elem = formElements[i];
            switch (elem.type) {
                case 'submit':
                    break;
                case 'radio':
                    if (elem.checked) {
                        formParams[elem.id] = elem.value;
                    }
                    break;
                case 'checkbox':
                    if (elem.checked) {
                        formParams[elem.id] = this.setOrPush(formParams[elem.id], elem.value);
                    }
                    break;
                default:
                    formParams[elem.id] = this.setOrPush(formParams[elem.id], elem.value);
            }
        }
        return formParams;
    }
    

    render() {

        const categoryDropdownList = this.eventCategoryList.map(x => this.createCategoryList(x));
        const timelist = this.createTimesList();

        return <div>

            <form id="addevent-form" action="" method="post">
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="Name">Event name:</label></td>
                            <td><input type="text" id="Name" placeholder="Event name..." required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="OrganizerName">Event organizer:</label></td>
                            <td><input type="text" id="OrganizerName" placeholder="Organizer name..." required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="LocationName">Location name:</label></td>
                            <td><input type="text" id="LocationName" placeholder="Location name..." required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="DescriptionText">Description:</label></td>
                            <td><textarea id="DescriptionText" rows="5" cols="21"></textarea></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="StreetName">Street:</label></td>
                            <td><input type="text" id="StreetName" placeholder="Street address..." required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="City">City:</label></td>
                            <td><input type="text" id="City" placeholder="City name..." required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="ZipCode">Zip code:</label></td>
                            <td><input type="text" id="ZipCode" placeholder="Zip code..." required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="State">State:</label></td>
                            <td><input type="text" id="State" placeholder="State..." required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="Category">Category:</label></td>
                            <td><select id="Category" name="category">
                                {categoryDropdownList}
                            </select></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="Price">Price:</label></td>
                            <td><input type="number" min="0" max="9999" id="Price" placeholder="0 free..." required /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="WebAddress">Web:</label></td>
                            <td><input type="url" maxLength="100" id="WebAddress" placeholder="Web site for more info..." /></td>
                        </tr>
                        <tr>
                            <td>Time:</td>
                            <td><select id="Time" name="time">
                                {timelist}
                            </select></td>
                        </tr>
                        <tr>
                            <td>Date:</td>
                            <td>
                                <ModernDatepicker
                                    id="BeginningDateTime"
                                    date={this.state.startDate}
                                    format={'YYYY-MM-DD'}
                                    showBorder
                                    onChange={this.handleStartChange}
                                    placeholder={'Select a date'}
                                />
                            </td>

                        </tr>
                        <tr>
                            <td><input type="submit" value="Submit" /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    }
}
