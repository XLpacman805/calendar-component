const createCalendar = (date) => {
    const firstOfMonth = new Date(date);
    const lastofMonth = new Date(date);
    firstOfMonth.setDate(1);
    lastofMonth.setDate(0);

    let calendar = [];

    for (let i = 0; i < 5*7; i++) { //5 week calendar
        if (i < firstOfMonth.getDay()) { // day is 0-6
            let previousDate = new Date(date);
            previousDate.setDate((firstOfMonth.getDay() * -1) + i + 1)
            calendar.push(previousDate);
        } else if (i === firstOfMonth.getDay()) {
            calendar.push(firstOfMonth);
        } else {
            let d = new Date(date);
            d.setDate(i);
            calendar.push(d);
        }
    }

    return [
        calendar.slice(0 ,7),
        calendar.slice(7, 7 * 2),
        calendar.slice(7*2, 7 * 3),
        calendar.slice(7*3, 7 * 4),
        calendar.slice(7*4)
    ];
}

const getPreviousMonth = (date) => {
    const d = new Date(date);
    d.setMonth(d.getMonth() - 1);
    return d;
}

const getNextMonth = (date) => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + 1);
    return d;
}

export {getPreviousMonth, getNextMonth, createCalendar}