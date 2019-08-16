import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class CalendarDayRow extends Component {

    constructor(props) {
        super(props);
        this.dateObj = this.props.dateObj;
        //this.eventCat = this.props.eventCat;
        this.getDayEventData = this.getDayEventData.bind(this)
        this.fillCalendarRow = this.fillCalendarRow.bind(this);
        this.eventCategoryList = ['Musiikki', 'Museot', 'Teatteri', 'Vapaa-aika', 'Urheilu', 'Lapsille', 'Ruoka ja Juoma', 'Muut menot'];
        this.addedEventArr = [{ "id": 1, "userId": 1, "organizerName": "Helsingin Kaupunki", "name": "Kulta Juhlat 2019", "locationName": "Tori", "streetName": "Mannerheimintie 15", "zipCode": "01001     ", "city": "Helsinki", "state": "Uusimaa", "category": "Musiikki", "price": 0.1, "beginningDateTime": "2019-08-16T20:00:00", "descriptionText": "Leijonien kultajuhlat 2019", "webAddress": "www.helsinki.fi" },
            { "id": 2, "userId": 1, "organizerName": "Vantaan Kaupunki", "name": "Kaljakellunta", "locationName": "Vantaanjoki", "streetName": "Vantaanjokitie 123", "zipCode": "06100     ", "city": "Vantaa", "state": "Uusimaa", "category": "Muut menot", "price": 0.1, "beginningDateTime": "2019-08-17T07:00:00", "descriptionText": "Laillinen kaljakellunta tapahtuma jonka järjestäjänä on vantaan kaupunki", "webAddress": "www.vantaa.fi" },
            { "id": 3, "userId": 1, "organizerName": "Espoon Kaupunki", "name": "Ilotulitus juhlat", "locationName": "Tapiolanpuisto", "streetName": "Tapiolantie 123", "zipCode": "02400     ", "city": "Espoo", "state": "Uusimaa", "category": "Muut menot", "price": 0.1, "beginningDateTime": "2019-08-18T22:30:00", "descriptionText": "Ilotulitus ihan vain kaikkien iloksi.", "webAddress": "www.espoo.fi" }];
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

    getDayEventData() {
        let propertyOfCategoryString;
        for (let i = 0; i < this.eventData.length; i++) {
            if (this.eventData[i]['beginningDateTime'].slice(0, 10).localeCompare(this.dateObj.eventDate) === 0) {
                this.dailyEventArr.push(this.eventData[i]);
                propertyOfCategoryString = String(this.eventData[i]['category']);
                this.eventBlock[this.eventData[i]['category']].push(this.eventData[i]);
            }
        }         
        //console.log('this.dailyEventArr: ' + JSON.stringify(this.dailyEventArr));
        //console.log('this.eventBlock' + JSON.stringify(this.eventBlock));
    }

    fillCalendarRow() {
        let eventCatStyle = {
            backgroundColor: 'lightgray',
            margin: '0.1em'
        }

        let eventTextStyle = {
            fontWeight: 'normal',
            textAlign: 'left',
            textDecoration: 'none'
        }
        if (this.eventData.length === 3) {
            this.eventData = this.eventData.concat(this.addedEventArr);
            this.getDayEventData();
        }
       
        for (let i = 0; i < this.eventCategoryList.length; i++) {            
            this.elemEventList[i] = this.eventBlock[this.eventCategoryList[i]].map((event, index) => {
                let eventLink = 'event/' + event['id'];
                return <li key={index} >
                    <Link to={eventLink} style={eventTextStyle} >{event.beginningDateTime.slice(11, 13) + " " + event.name}</Link>
                </li>
                });
            //console.log('this.elemEventList[' + i + ']' + this.elemEventList[i]);
        }
        if (this.categoryShown) {
            this.elemEventList = this.elemEventList.map((list, index) => <div key={index} style={eventCatStyle}>{this.eventCategoryList[index]}{list}</div>);
        } else {
            this.elemEventList = this.elemEventList.map((list, index) => <div key={index} style={eventCatStyle}>{list}</div>);
        }
    }


    componentDidMount() {
        this.fillCalendarRow();
    }

    render() {

        let mainContainer = {
            display: 'block',
            width: '90%'
        }

        let eventCatStyle = {
            backgroundColor: 'lightgray',
            margin: '0.1em'
        }

        let eventContainerStyle = {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
            gridTemplateRows: '1fr',
            gridGap: '0em',
            backgroundColor: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            minHeight: '5.7em'
        }

        let listContainer = {
            display: 'block',
            width: '93%',
            float: 'right',
            listStyle: 'none'
        }

        let dateContainer = {
            display: 'block',
            width: '7%',
            float: 'left',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'darkgray',
            margin: '0em, 0em',
            minHeight: '5.6em'
        }

        let dayStyle = {
            fontSize: '1.5em',
            textAlign: 'right'
        }

        let myStyle = {
            textAlign: 'right'
        }

        this.eventData = this.props.eventData;
        this.categoryShown = this.props.categoryShown;

        if (Object.keys(this.dateObj).length === 0 && this.dateObj.constructor === Object) {
        } else {
            if (this.eventData.length > 0) {
                this.fillCalendarRow();
            }
        }

           
        return <div>
            <div className="mainContainer" style={mainContainer}>
                <div style={listContainer}>
                    <div style={eventContainerStyle}>{this.elemEventList}</div>
                </div>
                <div style={dateContainer}>
                    <div>{this.dateObj.weekday}</div>
                    <div style={dayStyle}>{this.dateObj.day}</div>
                    <div style={myStyle}>{this.dateObj.month}</div>
                    <div style={myStyle}>{this.dateObj.year}</div>
                </div>
            </div>
        </div>
    }
}