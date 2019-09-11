
function calendarDayFormat(dateToFormat, newFirstDate) {
        let dateObj = {};
        let options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        //console.log('dateToFormat :' + JSON.dateToFormat);
        let arrDate = dateToFormat.toLocaleDateString("fi", options).split(" ");
        dateObj.weekday = arrDate[0].slice(0, (arrDate[0].length - 2));
        dateObj.day = dateToFormat.getDate();
        dateObj.month = arrDate[2].slice(0, (arrDate[2].length - 2));
        dateObj.year = dateToFormat.getFullYear();
        dateObj.eventDate = dateToFormat.toISOString().substring(0, 10); // to get daily event from dataObj
        dateToFormat.toDateString().localeCompare(newFirstDate) === 0 ? dateObj.today = true : dateObj.today = false;
        return dateObj;
    }



export const CreateDateArray = {

    createCalDayArray(date) {
        const daysInWeek = 7
        console.log('CreateDateArray, date: ' + date.toDateString());
        const newFirstDate = date.toDateString()
        let arrDate = [];
        console.log('CreateDateArray, newFirstDate: ' + newFirstDate);
        arrDate.push(calendarDayFormat(date, newFirstDate));
        let nextDay = new Date(date);     
        nextDay.setDate(date.getDate() + 1);
        arrDate.push(calendarDayFormat(nextDay, newFirstDate));
        while (arrDate.length < daysInWeek) {
            nextDay.setDate(nextDay.getDate() + 1);
            arrDate.push(calendarDayFormat(nextDay, newFirstDate));
        }
        return arrDate;
    }
}
