import React, { Component } from 'react';


export class CalendarDayRow extends Component {

    constructor(props) {
        super(props);
        this.dateObj = this.props.dateObj;
        this.eventCat = this.props.eventCat;
        this.categoryShown = this.props.categoryShown;
        this.eventData = this.props.eventData;
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
            gridGap:'0em',         
            backgroundColor: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            minHeight: '5.7em'
        }
            
        let listContainer = {
            display: 'block',
            width: '93%',
            float: 'right'
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
        //let elemEventCat = <div style={eventCatStyle}></div>;
        if (!this.categoryShown) {
            this.eventCat.fill("");    
        }
        let elemEventCat = this.eventCat.map((cat, index) => <div key={index} style={eventCatStyle}> {cat}</div>);

        return <div>
            <div style={mainContainer}>
                <div style={listContainer}>
                    <div style={eventContainerStyle}>{elemEventCat}</div>
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