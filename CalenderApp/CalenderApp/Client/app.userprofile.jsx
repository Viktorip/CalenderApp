import React, { Component } from 'react';
import { HTTP } from './http';
import { Link } from 'react-router-dom';

export class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.makePersonalView = this.makePersonalView.bind(this);
        this.makePublicView = this.makePublicView.bind(this);

        this.state = { userEventsList: [], view: [] };
    }

    componentDidMount() {
        const urlId = this.props.match.params.userId;
        const sessionUserId = sessionStorage.getItem('userId');
        let eventlist = [];
        
        HTTP.get('/api/users/' + urlId).then(userData => {
            //After getting user, get all events, they are as ID's in ownEvents array
            //console.log("Got user:", JSON.stringify(userData));
            const splitEvents = userData.ownEvents.split(",");

            splitEvents.forEach(eventId => {
                HTTP.get('/api/calenderevents/' + eventId).then(eventItem => {
                    eventlist.push(this.createEventListItem(eventItem));
                    //console.log("Got event:", JSON.stringify(eventItem));
                    this.setState({ userEventsList: eventlist });
                });
            });
            
            /*
            if (urlId == sessionUserId) {
                //User looking at their own profile
                this.setState({ view: this.makePersonalView(userData) });
            } else {
                //Stranger looking at your profile
                this.makePublicView(userData);
            }
            */
        });

        
    }



    makePersonalView(user) {
        return <div>
            
        </div>
    }

    makePublicView(user) {

    }

    createEventListItem(eventItem) {
        //makes a list of the events the user has submitted
        const eventlink = '/event/' + eventItem.id;
        return <tr key={eventItem.id}><td><Link to={eventlink}>{eventItem.name}</Link></td><td>{eventItem.organizerName}</td><td>{eventItem.descriptionText}</td></tr>
    }


    render() {



        return <div>
            <h1>Submitted events:</h1>
            <table>
                <tbody>
                {this.state.userEventsList}
                </tbody>
            </table>
            
        </div>
    }
}