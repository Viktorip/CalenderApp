import React, { Component } from 'react';
import { HTTP } from './http';


export class CalenderEvent extends Component {

    constructor(props) {
        super(props);

        this.state = { data: {} };
        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;

        if (this.props.match.params.eventId) {
            this.getEventData(this.props.match.params.eventId);
        };

        //this.props.history.listen returns the unlisten function that you use to unlisten the function
        this.unlisten = this.props.history.listen((location, action) => {
            if (location.pathname != this.props.location.pathname) {
                this.props.location.pathname = location.pathname;
                const urlid = location.pathname.match(/\d+$/);
                if(urlid) this.props.match.params.eventId = urlid[0];
            }
            this.getEventData(this.props.match.params.eventId);
        });
    }

    componentWillUnmount() {
        this.unlisten();
        this.mounted = false;
    }

    getEventData(id) {
        HTTP.get('/api/calenderevents/' + id).then(data => {
            if(this.mounted) this.setState({ data });
        });
    }


    render() {
        const { data } = this.state;

        return <div>
            <h3>Event:</h3><p>{data.name}</p>
            <h3>Organizer:</h3><p>{data.organizerName}</p>
            <h3>Description:</h3><p>{data.descriptionText}</p>
            <h3>Where:</h3>
            <p>
                {data.locationName}, {data.streetName}, {data.zipCode}, {data.city}, {data.state}
            </p>
            </div>
    }
}