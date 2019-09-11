import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class WeekNavigation extends Component {

    constructor(props) {
        super(props);
        this.firstDay = this.props.firstDay;
        this.prevTransit = 0;
        this.nextTransit = 0;
        this.weekTransition = 0;
        this.getWeekNumber = this.getWeekNumber.bind(this);
        this.setNewFirstDay = this.setNewFirstDay.bind(this);

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

    setNewFirstDay(transit=0) {
        let newDay = new Date(this.firstDay);
        console.log('newDay :' + newDay.toDateString());
        transit = transit * 7; // +week or -week, week = 7 days
        newDay.setDate(newDay.getDate() + transit);
        console.log('After transit newDay :' + newDay.toDateString());
        this.props.callback(newDay);
    }

    componentDidMount() {
        this.prevTransit = -1;
        this.nextTransit = 1;
        this.today = new Date().toDateString();
        this.prevWeek = this.getWeekNumber(this.firstDay);
        this.nextWeek = this.prevWeek + 1;
        if (this.today.localeCompare(this.firstDay.toDateString()) === 0) {
            this.prevWeek--;
        }
    }

    render() {

        return <div>
            <div className='weekNav'>
                <div><span className='weekButton' type="button" onClick={()=>this.setNewFirstDay(this.prevTransit)}>{'\u003C\u003C' + this.prevWeek}</span> week <span className='weekButton' type="button" onClick={() => this.setNewFirstDay(this.nextTransit)}>{' ' + this.nextWeek + '\u003E\u003E'}</span></div>
            </div>
        </div>
    }
}