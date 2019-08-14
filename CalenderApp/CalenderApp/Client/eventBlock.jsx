import React, { Component } from 'react';


export class EventBlock extends Component {

    constructor(props) {
        super(props);
        this.elemEventList = this.props.eventList.map((event) => <ul>{event}<ul/>);
    }

    render() {
        return <div>
            <div>{this.dateObj.weekday}</div>
            <div>{this.dateObj.dayOfMonth}</div>
            <div>{this.dateObj.month}</div>
            <div>{this.dateObj.year}</div>
        </div>
    }
}