
function calendarDayFormat(dateToFormat, today) {
        let dateObj = {};
        let options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        let arrDate = dateToFormat.toLocaleDateString("fi", options).split(" ");
        dateObj.weekday = arrDate[0].slice(0, (arrDate[0].length - 2));
        dateObj.day = dateToFormat.getDate();
        dateObj.month = arrDate[2].slice(0, (arrDate[2].length - 2));
        dateObj.year = dateToFormat.getFullYear();
        dateObj.eventDate = dateToFormat.toISOString().substring(0, 10); // to get daily event from dataObj
        let dateStr = dateToFormat.toString();
        dateStr.slice(0, 15).localeCompare(today.slice(0, 15)) === 0 ? dateObj.today = true : dateObj.today = false;
        console.log('dateObj.today: ' + dateObj.today);
        return dateObj;
    }



export const CreateDateArray = {
    createCalDayArray(date) {
        let daysInWeek = 7
        let arrDate = [];
        let today = new Date().toString();
        arrDate.push(calendarDayFormat(date, today));
        let nextDay = new Date(date);     
        nextDay.setDate(date.getDate() + 1);
        arrDate.push(calendarDayFormat(nextDay, today));
        while (arrDate.length < daysInWeek) {
            nextDay.setDate(nextDay.getDate() + 1);
            arrDate.push(calendarDayFormat(nextDay, today));
        }
        return arrDate;
    }
}
