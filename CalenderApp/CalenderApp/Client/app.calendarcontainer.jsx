import React, { Component } from 'react';
import { HTTP } from './http';
import { CalendarDayRow } from './app.calendarDayRow';

// newDate -> fetch eventData -> store it -> put it to template -> set nextDate

export class CalendarContainer extends Component {

    constructor(props) {
        super(props);

        // dateObj[] contains weekday, dayOfMonth, Month

        this.date = new Date();
        this.arrDateObj = [];

        /*
        this.dateObj = {
            weekday: "Sunnuntai",
            dayOfMonth: 11,
            month: "elokuu",
            year: 2019
        }
        this.arrDateObj.push(this.dateObj);
        this.arrDateObj.push({
            weekday: "Maanantai",
            dayOfMonth: 12,
            month: "elokuu",
            year: 2019
        });
        */

        this.weekday = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"];

        this.eventData = {
            'BeginningDateTime': '12/08/2019 10:00:00',
            'Category': 'Musiikki',
            'Name': 'Puska Metal Festival',
            'LocationName': 'Kaisaniemenpuisto',
            'DescriptionText': 'Puskaa pukkaa.'
        };

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

        this.eventDataMap = new Map();
        let category = this.eventData['Category'];
        // let date = this.eventData['BeginningDateTime'].slice(0, 10); //???
        // console.log(date);
        let tmpArr = [];
        tmpArr.push(this.eventData);
        //this.eventDateMap.set(date, this.eventDataCat[category].push(this.eventData)); // kaikki data tänne talteen
   
    }

   
    render() {

        function calendarDayFormat(dateToFormat) {
            let options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            };
            let arrDate = dateToFormat.toLocaleDateString("fi", options).split(" ");
            let dateObj2 = {};
            dateObj2.weekday = arrDate[0].slice(0, (arrDate[0].length - 2));
            dateObj2.day = dateToFormat.getDate();
            dateObj2.month = arrDate[2].slice(0, (arrDate[2].length - 2));
            dateObj2.year = dateToFormat.getFullYear();
            return dateObj2;
        }

        
        function createCalDayArray(d) {
            let daysInWeek = 7
            let tmpArrDate = [];
            tmpArrDate.push(calendarDayFormat(d));
            let nextDay = new Date(d);
            nextDay.setDate(d.getDate() + 1);
            console.log('Huominen: ' + nextDay);
            tmpArrDate.push(calendarDayFormat(nextDay));
            while (tmpArrDate.length < daysInWeek) {
                nextDay.setDate(nextDay.getDate() + 1);
                console.log('Ylihuominen: ' + nextDay);
                tmpArrDate.push(calendarDayFormat(nextDay));
            }
            return tmpArrDate;
        }
        

        let d = new Date();
        this.arrDateObj = createCalDayArray(d);
        console.log('Tulostetaan originaali: ' + d.getDate());
        console.log('Tulostetaan lokalisoitu: ' + calendarDayFormat(d).weekday + ', ' + calendarDayFormat(d).day + ', '+
            calendarDayFormat(d).month + ', ' + calendarDayFormat(d).year );

        return <div>
                    
                    <div className="containerFirstRow">
                        <div className="calendar">
                    <CalendarDayRow dateObj={this.arrDateObj[0]} eventCat={this.eventDataCat} />
                            <br /> 
                            <CalendarDayRow dateObj={this.arrDateObj[1]} />
                            <br />
                            <CalendarDayRow dateObj={this.arrDateObj[2]} />
                            <br />
                            <CalendarDayRow dateObj={this.arrDateObj[3]} />
                            <br />
                            <CalendarDayRow dateObj={this.arrDateObj[4]} />
                            <br />
                            <CalendarDayRow dateObj={this.arrDateObj[5]} />
                            <br />
                            <CalendarDayRow dateObj={this.arrDateObj[6]} />
                        </div>                
                    </div>
                    <br />
                    <br />
                    <div>Kalenteri16</div> 

                </div>
    }
}