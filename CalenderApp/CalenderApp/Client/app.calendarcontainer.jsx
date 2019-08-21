import React, { Component } from 'react';
import { HTTP } from './http';
import { CreateDateArray } from './dateDataHandler';
import { CalendarDayRow } from './app.calendarDayRow';

// newDate -> fetch eventData -> store it -> put it to template -> set nextDate

export class CalendarContainer extends Component {

    constructor(props) {
        super(props);
        this.tempDate = "2019-08-16"; // only for testing
        this.state = {
            eventData: []
        };
        this.date = new Date();
        this.getAllEventdata = this.getAllEventdata.bind(this);
        this.calendarEventPath = 'api/calenderevents';
        this.arrDateObj = [];
        this.eventDataCat = {
            'Musiikki': [],
            'Museot': [],
            'Teatteri': [],
            'Leffat': [],
            'Urheilu': [],
            'Lapsille': [],
            'Ruoka ja Juoma': [],
            'Muut menot': []
        };

        this.arrDateObj = CreateDateArray.createCalDayArray(this.date);
    }

    getAllEventdata() {
        HTTP.get(this.calendarEventPath).then((data) => {
            this.handleEventData(data);
        });
    }

    handleEventData(data) {        
        this.setState({ eventData: data });
        console.log('Tapahtumat: ' + JSON.stringify(this.state.eventData));
        
    }

    componentDidMount() {
        this.getAllEventdata();
    }

    render() {       
        return <div>                   
                    <div className="calendar">
                        <CalendarDayRow className="row0" dateObj={this.arrDateObj[0]} eventData={this.state.eventData} categoryShown={true} />
                        <CalendarDayRow className="row1" dateObj={this.arrDateObj[1]} eventData={this.state.eventData} categoryShown={false} />
                        <CalendarDayRow className="row2" dateObj={this.arrDateObj[2]} eventData={this.state.eventData} categoryShown={false} />
                        <CalendarDayRow className="row3" dateObj={this.arrDateObj[3]} eventData={this.state.eventData} categoryShown={false} />
                        <CalendarDayRow className="row4" dateObj={this.arrDateObj[4]} eventData={this.state.eventData} categoryShown={false} />
                        <CalendarDayRow className="row5" dateObj={this.arrDateObj[5]} eventData={this.state.eventData} categoryShown={false} />
                        <CalendarDayRow className="row6" dateObj={this.arrDateObj[6]} eventData={this.state.eventData} categoryShown={false} />
                    </div>                
                </div>
    }
}