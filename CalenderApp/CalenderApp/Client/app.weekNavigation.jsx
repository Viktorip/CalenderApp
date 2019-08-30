import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class WeekNavigation extends Component {

    constructor(props) {
        super(props);
        this.getWeekNumber = this.getWeekNumber.bind(this);

    }

    getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        // Get first day of year
        let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday
        let weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        // Return array of year and week number
        return weekNo;
    }

    render() {
        let firstWeekday = "maanantai";
        let today = this.props.weekday;
        let prevWeek = this.getWeekNumber(new Date());
        let nextWeek = prevWeek + 1;
        if (today.localeCompare(firstWeekday) === 0) {
            prevWeek--;
        }
        return <div>
            <div>{<span>lt</span>prevWeek} week {nextWeek}</div>
        </div>
    }
}