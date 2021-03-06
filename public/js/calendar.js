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

const compareDates = (dateA, dateB) => {
    const a = dateA.getFullYear().toString() + dateA.getMonth().toString() + dateA.getDate().toString();
    const b = dateB.getFullYear().toString() + dateB.getMonth().toString() + dateB.getDate().toString();
    return a === b;
}

class Calendar extends HTMLElement {
    constructor() {
        super();
        this.activeDate = new Date();
        this.dayMap = new Map([
            [0, 'Sunday'],
            [1, 'Monday'],
            [2, 'Tuesday'],
            [3, 'Wednesday'],
            [4, 'Thursday'],
            [5, 'Friday'],
            [6, 'Saturday']
        ]);
        this.monthMap = new Map([
            [0, 'January'],
            [1, 'February'],
            [2, 'March'],
            [3, 'April'],
            [4, 'May'],
            [5, 'June'],
            [6, 'July'],
            [7, 'August'],
            [8, 'September'],
            [9, 'October'],
            [10, 'November'],
            [11, 'December']
        ]);
        this.addEventListener('click', this.handleClick);
    }

    connectedCallback() {
        this.render();
    }

    handleClick(event) {
        if (event.target.classList.contains('previous-month')) {
            this.setActiveDate(getPreviousMonth(this.activeDate));
        } else if (event.target.classList.contains('next-month')) {
            this.setActiveDate(getNextMonth(this.activeDate));
        } else if (event.target.tagName === 'TD') {
            this.setActiveDate(new Date(event.target.dataset.date));
        }
    }

    setActiveDate(date) {
        if (date instanceof Date) {
            this.activeDate = date;
            this.render();
        }
    }

    createDateView(date) {
        return `
            <div class="date-view">
                <h3> ${this.dayMap.get(date.getDay())} </h3>
                <h2> ${date.getDate()} </h2>
            </div>
        `;
    }

    createCalendarControls(date) {
        return `
            <div class="calendar-controls">
                <button class="previous-month"> << </button>
                <h3> ${this.monthMap.get(date.getMonth()) + ' ' + date.getFullYear().toString()} </h3>
                <button class="next-month"> >> </button>
            </div>
        `;
    }

    createCalendarView(calendar) {
        const rows = calendar.map(week => `<tr> ${week.map(date => `<td ${compareDates(date, this.activeDate) ? 'class="active"' : ''} data-date="${date.toISOString()}"> ${date.getDate()} </td>`).join('')} </tr>`).join('');
        return `
            <div class="calendar-grid">
                <table>
                    <tbody>
                        <tr>
                            <th>S</th>
                            <th>M</th>
                            <th>T</th>
                            <th>W</th>
                            <th>Th</th>
                            <th>F</th>
                            <th>Sa</th>
                        </tr>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `;
    }

    render() {
        this.innerHTML = `
            <div class="jm-calendar">
                ${this.createDateView(this.activeDate)}
                <div class="calendar-container">
                    ${this.createCalendarControls(this.activeDate)}
                    ${this.createCalendarView(createCalendar(this.activeDate))}
                </div>
            </div>
        `;
    }
}

customElements.define('jm-calendar', Calendar);
export {getPreviousMonth, getNextMonth, createCalendar}