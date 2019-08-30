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
            <div className="eventDescBox">
                <span className="login" >{data.name}</span>
                <br />
                <br />
                <span className="registerForm">Organisoija: </span><span>{data.organizerName}</span>
                <br />
                <p className="registerForm">Lisätietoa tapahtumasta:</p>
                <span>{data.descriptionText}</span>
                <br />
                <br />
                <p>
                    {data.locationName} <br/>
                    {data.streetName} <br/>
                    {data.zipCode}<br/>
                    {data.city}<br />
                </p>
                <span>Ajankohdat: {data.beginningDateTime}</span>               
            </div>
        </div>
    }
}