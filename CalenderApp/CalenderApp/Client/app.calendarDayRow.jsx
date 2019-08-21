import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class CalendarDayRow extends Component {

    constructor(props) {
        super(props);
        this.dateObj = this.props.dateObj;
        this.getDayEventData = this.getDayEventData.bind(this)
        this.fillCalendarRow = this.fillCalendarRow.bind(this);
        this.sortOneBlock = this.sortOneBlock.bind(this);
        this.eventCategoryList = ['Musiikki', 'Museot', 'Teatteri', 'Vapaa-aika', 'Urheilu', 'Lapsille', 'Ruoka ja Juoma', 'Muut menot'];
        this.addedEventArr = [{ "id": 1, "userId": 1, "organizerName": "Helsingin Kaupunki", "name": "Kulta Juhlat 2019", "locationName": "Tori", "streetName": "Mannerheimintie 15", "zipCode": "01001     ", "city": "Helsinki", "state": "Uusimaa", "category": "Muut menot", "price": 0.1, "beginningDateTime": "2019-08-20T20:00:00", "descriptionText": "Leijonien kultajuhlat 2019", "webAddress": "www.helsinki.fi" },
            { "id": 2, "userId": 1, "organizerName": "Vantaan Kaupunki", "name": "Kaljakellunta", "locationName": "Vantaanjoki", "streetName": "Vantaanjokitie 123", "zipCode": "06100     ", "city": "Vantaa", "state": "Uusimaa", "category": "Muut menot", "price": 0.1, "beginningDateTime": "2019-08-20T07:00:00", "descriptionText": "Laillinen kaljakellunta tapahtuma jonka järjestäjänä on vantaan kaupunki", "webAddress": "www.vantaa.fi" },
            { "id": 3, "userId": 1, "organizerName": "Espoon Kaupunki", "name": "Ilotulitus juhlat", "locationName": "Tapiolanpuisto", "streetName": "Tapiolantie 123", "zipCode": "02400     ", "city": "Espoo", "state": "Uusimaa", "category": "Muut menot", "price": 0.1, "beginningDateTime": "2019-08-20T22:30:00", "descriptionText": "Ilotulitus ihan vain kaikkien iloksi.", "webAddress": "www.espoo.fi" }];
        this.dailyEventArr = [];
        this.elemEventList = [];
        this.eventBlock = {};
        let tmpEventDateObj = {};
        let tmpEventBlock = {};
        this.date = String(this.dateObj.eventDate);
        let propertyString;
        let propertyOfCategoryString;
        for (let i = 0; i < this.eventCategoryList.length;i++) {
            propertyString = this.dateObj.eventDate + "&" + this.eventCategoryList[i];
            propertyOfCategoryString = this.eventCategoryList[i];
            tmpEventDateObj[propertyString] = new Array;
            tmpEventBlock[propertyOfCategoryString] = new Array;
        }
        this.eventDateObj = tmpEventDateObj;
        this.eventBlock = tmpEventBlock;
    }

    sortOneBlock(arr) {
        return arr.sort((item, itemNext) => item.beginningDateTime.slice(11, 13) - itemNext.beginningDateTime.slice(11, 13));
    }

    getDayEventData() {
        let propertyOfCategoryString;
        for (let i = 0; i < this.eventData.length; i++) {
            if (this.eventData[i]['beginningDateTime'].slice(0, 10).localeCompare(this.dateObj.eventDate) === 0) {
                this.dailyEventArr.push(this.eventData[i]);
                propertyOfCategoryString = String(this.eventData[i]['category']);
                this.eventBlock[this.eventData[i]['category']].push(this.eventData[i]);
            }        
        }
        for (let i = 0; i < this.eventCategoryList.length; i++) {
            this.eventBlock[this.eventCategoryList[i]] = this.sortOneBlock(this.eventBlock[this.eventCategoryList[i]]);
        }
        //console.log('this.dailyEventArr: ' + JSON.stringify(this.dailyEventArr));
        //console.log('this.eventBlock' + JSON.stringify(this.eventBlock));

    }

    fillCalendarRow() {
        let eventCatStyle = { listStyle: 'none' };
        let eventTextStyle = { listStyle: 'none' };
        if (this.eventData.length === 3) {
            this.eventData = this.eventData.concat(this.addedEventArr);
            this.getDayEventData();
        }
       
        for (let i = 0; i < this.eventCategoryList.length; i++) {       
            this.elemEventList[i] = this.eventBlock[this.eventCategoryList[i]].map((event, index) => {
                let eventLink = 'event/' + event['id'];
                return <li key={index} className="eventTextStyle" style={eventTextStyle}>
                    <Link to={eventLink} className="eventTextStyle" style={eventTextStyle} >{event.beginningDateTime.slice(11, 13) + " " + event.name}</Link>
                </li>
                });
            //console.log('this.elemEventList[' + i + ']' + this.elemEventList[i]);
        }
        if (this.categoryShown) {
            this.elemEventList = this.elemEventList.map((list, index) => <div key={index} className="eventCatStyle" style={eventCatStyle}>{this.eventCategoryList[index]}{list}</div>);
        } else {
            this.elemEventList = this.elemEventList.map((list, index) => <div key={index} className="eventCatStyle" style={eventCatStyle}>{list}</div>);
        }
    }


    componentDidMount() {
        this.fillCalendarRow();
    }

    render() {

        let listContainer = {listStyle: 'none'};
        let dateContainer = {margin: '10px, 0px', listStyle: 'none'};
        let eventContainerStyle = {listStyle: 'none'};
        //let dayStyle = {listStyle: 'none'};
        let myStyle = { listStyle: 'none' };

        this.eventData = this.props.eventData;
        this.categoryShown = this.props.categoryShown;
        this.className = this.props.className;
        if (Object.keys(this.dateObj).length === 0 && this.dateObj.constructor === Object) {
        } else {
            if (this.eventData.length > 0) {
                this.fillCalendarRow();
            }
        }

        this.dateObj.today ? dateContainer.backgroundColor = "darkorange" : dateContainer.backgroundColor = "darkgray";
        return <div>
            <div className="rowContainer">
                <div className="dateContainer" style={dateContainer}>
                    <div className="weekday" >{this.dateObj.weekday}</div>
                    <div className="dayStyle" >{this.dateObj.day}</div>
                    <div className="myStyle" style={myStyle}>{this.dateObj.month}</div>
                    <div className="myStyle" style={myStyle}>{this.dateObj.year}</div>
                </div>
                <div className="listContainer" style={listContainer}>
                    <div className="eventContainer" style={eventContainerStyle}>{this.elemEventList}</div>
                </div>

            </div>
         </div>
    }
}