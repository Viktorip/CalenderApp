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

        this.weekday = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"]; // tarvitaanko ???

        this.eventData = {
            'BeginningTime': '10',
            'Category': 'Musiikki',
            'Name': 'Puska Metal Festival',
            'LocationName': 'Kaisaniemenpuisto',
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

        this.eventCategoryList = ['Musiikki', 'Museot', 'Teatteri', 'Leffat', 'Urheilu', 'Lapsille', 'Ruoka ja Juoma', 'Muut menot'];

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
                    <CalendarDayRow dateObj={this.arrDateObj[0]} eventCat={this.eventCategoryList} eventData={this.eventData} categoryShown={true}/>
                    <CalendarDayRow dateObj={this.arrDateObj[1]} eventCat={this.eventCategoryList} eventData={this.eventData} categoryShown={true}/>
                    <CalendarDayRow dateObj={this.arrDateObj[2]} eventCat={this.eventCategoryList} eventData={this.eventData} categoryShown={false}/>
                    <CalendarDayRow dateObj={this.arrDateObj[3]} eventCat={this.eventCategoryList} eventData={this.eventData} categoryShown={false}/>
                    <CalendarDayRow dateObj={this.arrDateObj[4]} eventCat={this.eventCategoryList} eventData={this.eventData} categoryShown={false}/>
                    <CalendarDayRow dateObj={this.arrDateObj[5]} eventCat={this.eventCategoryList} eventData={this.eventData} categoryShown={false}/>
                    <CalendarDayRow dateObj={this.arrDateObj[6]} eventCat={this.eventCategoryList} eventData={this.eventData} categoryShown={false}/>
                        </div>                
                    </div>
                </div>
    }
}