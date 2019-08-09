import React, { Component } from 'react';
import { HTTP } from './http';


export class CalendarContainer extends Component {

    constructor(props) {
        super(props);
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
        let date = this.eventData['BeginningDateTime'].slice(0, 9); //???
        console.log(date);
        let tmpArr = [];
        tmpArr.push(this.eventData);
        //this.eventDateMap.set(date, this.eventDataCat[category].push(this.eventData)); // kaikki data tänne talteen
   
    }

    render() {

        let elemCal = this.weekday.map((day) => <div>{day}</div>);
        return <div>
                <div className="weekday">
                    Kalenteri11
                    {elemCal}
                </div>
            </div>
    }
}