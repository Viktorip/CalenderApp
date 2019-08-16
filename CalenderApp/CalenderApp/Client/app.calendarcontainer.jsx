import React, { Component } from 'react';
import { HTTP } from './http';
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
        this.calendarDayFormat = this.calendarDayFormat.bind(this);
        this.createCalDayArray = this.createCalDayArray.bind(this);
        this.getAllEventdata = this.getAllEventdata.bind(this);
        this.calendarEventPath = 'api/calenderevents';
        this.arrDateObj = [];
        this.weekday = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"]; // tarvitaanko ???
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

        //this.eventCategoryList = ['Musiikki', 'Museot', 'Teatteri', 'Leffat', 'Urheilu', 'Lapsille', 'Ruoka ja Juoma', 'Muut menot'];
        this.eventDataMap = new Map();
        this.arrDateObj = this.createCalDayArray(this.date);
    }

    calendarDayFormat(dateToFormat) {
        let dateObj2 = {};
        let options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        let arrDate = dateToFormat.toLocaleDateString("fi", options).split(" ");
        dateObj2.weekday = arrDate[0].slice(0, (arrDate[0].length - 2));
        dateObj2.day = dateToFormat.getDate();
        dateObj2.month = arrDate[2].slice(0, (arrDate[2].length - 2));
        dateObj2.year = dateToFormat.getFullYear();
        dateObj2.eventDate = dateToFormat.toISOString().substring(0, 10); // to get daily event from dataObj
        return dateObj2;
    }

    createCalDayArray(d) {
        let daysInWeek = 7
        let tmpArrDate = [];
        tmpArrDate.push(this.calendarDayFormat(d));
        let nextDay = new Date(d);
        nextDay.setDate(d.getDate() + 1);
        tmpArrDate.push(this.calendarDayFormat(nextDay));
        while (tmpArrDate.length < daysInWeek) {
            nextDay.setDate(nextDay.getDate() + 1);
            tmpArrDate.push(this.calendarDayFormat(nextDay));
        }
        return tmpArrDate;
    }

    getAllEventdata() {
        HTTP.get(this.calendarEventPath).then((data) => {
            this.handleEventData(data);
        });
    }

    handleEventData(data) {
        
        this.setState({ eventData: data });
        //this.setState({ loadedToggle: !this.loadedToggle });
        /*
        dailyEvents.map((event) => {
            //if (event.beginningDateTime.slice(0,10).localeCompare(tempDate) == 0) {
            this.eventData.push(event);
            } else {
                console.log('Päiväys: '+event.beginningDateTime)
            }
        });
        */
        /*
        let temppiArr = [];
        this.eventData.map((event) => temppiArr.push(event.name));
        */
        //console.log('Tapahtumat: ' + JSON.stringify(this.state.eventData));
        
    }

    componentDidMount() {
        this.getAllEventdata();
    }

    render() {
        
        return <div>                   
                    <div className="calendar">
                        <CalendarDayRow dateObj={this.arrDateObj[0]} eventData={this.state.eventData} categoryShown={true} />
                        <CalendarDayRow dateObj={this.arrDateObj[1]} eventData={this.state.eventData} categoryShown={false} />
                        <CalendarDayRow dateObj={this.arrDateObj[2]} eventData={this.state.eventData} categoryShown={false} />
                        <CalendarDayRow dateObj={this.arrDateObj[3]} eventData={this.state.eventData} categoryShown={false} />
                        <CalendarDayRow dateObj={this.arrDateObj[4]} eventData={this.state.eventData} categoryShown={false} />
                        <CalendarDayRow dateObj={this.arrDateObj[5]} eventData={this.state.eventData} categoryShown={false} />
                        <CalendarDayRow dateObj={this.arrDateObj[6]} eventData={this.state.eventData} categoryShown={false} />
                    </div>                
                </div>
    }
}