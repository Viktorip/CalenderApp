import React, { Component } from 'react';
import { HTTP } from './http';
import { Link } from 'react-router-dom';

export class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.makePersonalView = this.makePersonalView.bind(this);
        this.makePublicView = this.makePublicView.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.state = { userEventsList: [], view: [] };

        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;

        if (this.props.match.params.userId) {
            this.getUserData(this.props.match.params.userId);
        };

        //this.props.history.listen returns the unlisten function that you use to unlisten the function
        this.unlisten = this.props.history.listen((location, action) => {
            if (location.pathname != this.props.location.pathname) {
                this.props.location.pathname = location.pathname;
                const urlid = location.pathname.match(/\d+$/);
                if (urlid) this.props.match.params.userId = urlid[0];
            }
            this.getUserData(this.props.match.params.userId);
        });
        
    }

    componentWillUnmount() {
        this.mounted = false;
        this.unlisten();
    }

    getUserData(id) {
        const sessionUserId = sessionStorage.getItem('userId');
        let eventlist = [];

        HTTP.get('/api/users/' + id).then(userData => {
            if (id == sessionUserId) {
                //User looking at their own profile
                if (this.mounted) this.setState({ view: this.makePersonalView(userData) });
            } else {
                //Stranger looking at your profile
                if (this.mounted) this.setState({ view: this.makePublicView(userData) });
            }

            //console.log("Got user:", JSON.stringify(userData));
            HTTP.get('/api/calenderevents/userid/' + userData.id).then(userEventsList => {
                eventlist = userEventsList.map(e => this.createEventListItem(e));
                if (userEventsList.length) {
                    if (this.mounted) this.setState({ userEventsList: eventlist });
                } else {
                    if (this.mounted) this.setState({ userEventsList: <tr><td>None yet</td></tr> });
                }

            });

        });
    }

    makePersonalView(user) {
        console.log("User:", JSON.stringify(user));
        return <div>
            <h1>Welcome {user.nickName}</h1>
        </div>
    }

    makePublicView(user) {
        return <div>
            <h1>This is {user.nickName}'s page</h1>
        </div>
    }

    createEventListItem(eventItem) {
        //makes a list of the events the user has submitted
        const eventlink = '/event/' + eventItem.id;
        return <tr key={eventItem.id}><td><Link to={eventlink}>{eventItem.name}</Link></td><td>{eventItem.organizerName}</td><td>{eventItem.descriptionText}</td></tr>
    }


    render() {

        
        return <div>
            {this.state.view}
            <h1>Submitted events:</h1>
            <table>
                <tbody>
                    {this.state.userEventsList}
                </tbody>
            </table>
            
        </div>
    }
}