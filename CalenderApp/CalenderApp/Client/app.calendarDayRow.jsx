import React, { Component } from 'react';


export class CalendarDayRow extends Component {

    constructor(props) {
        super(props);
        this.dateObj = this.props.dateObj;
        this.eventCat = this.props.eventCat;
    }

    render() {

        return <div>

            <div>{this.dateObj.weekday}</div>
            <div>{this.dateObj.day}</div>
            <div>{this.dateObj.month}</div>
            <div>{this.dateObj.year}</div>
        </div>
    }
}