import chai from 'chai';
chai.should();
import {createCalendar, getNextMonth, getPreviousMonth} from '../public/js/calendar.js';

describe('Calendar.getPreviousMonth(Date)', () => {
    it('should return a Date type.', () => {
        const date = new Date();
        getPreviousMonth(date).should.be.instanceOf(Date);
    })

    it('Should return the previous calendar month', () => {
        const date = new Date();
        getPreviousMonth(date).getMonth().should.equal(date.getMonth() - 1);
    });

    it('Should return 11 when current month is 0', () => {
        const date = new Date();
        date.setMonth(0);
        getPreviousMonth(date).getMonth().should.equal(11);
    });

    it('Should return the last month of the year prior when date month is 0', () => {
        const date = new Date();
        date.setMonth(0);
        getPreviousMonth(date).getFullYear().should.equal(date.getFullYear() - 1);
    });

    it('Should return December, 2020 when the date passed in is Jan 2021', () => {
        const date = new Date();
        date.setFullYear(2021);
        date.setMonth(0);
        getPreviousMonth(date).getFullYear().should.equal(2020);
        getPreviousMonth(date).getMonth().should.equal(11);
    });
})

describe('Calendar.getNextMonth(Date)', () => {
    it('should return a Date type.', () => {
        const date = new Date();
        getNextMonth(date).should.be.instanceOf(Date);
    });

    it('Should return the next calendar month', () => {
        const date = new Date();
        getNextMonth(date).getMonth().should.equal(date.getMonth() + 1);
    });

    it('Should return 0 when current month is 11', () => {
        const date = new Date();
        date.setMonth(11);
        getNextMonth(date).getMonth().should.equal(0);
    });

    it('Should return the first month of the next year when date month is 11', () => {
        const date = new Date();
        date.setMonth(11);
        getNextMonth(date).getFullYear().should.equal(date.getFullYear() + 1);
    });

    
    it('Should return January, 2022 when the date passed in is Dec 2021', () => {
        const date = new Date();
        date.setFullYear(2021);
        date.setMonth(11);
        getNextMonth(date).getFullYear().should.equal(2022);
        getNextMonth(date).getMonth().should.equal(0);
    });
});

describe('createCalendar(Date)', () => {
    /**
     *  const desiredOutputAsDates = [
            [ 28, 1, 2, 3, 4, 5, 6 ],
            [ 7,  8,  9, 10, 11, 12, 13 ],
            [ 14, 15, 16, 17, 18, 19, 20 ],
            [ 21, 22, 23, 24, 25, 26, 27 ],
            [ 28, 29, 30, 31, 1,  2,  3]
        ];
     */
    it('Should return an array', () => {
        createCalendar(new Date()).should.be.an('array');
    });

    it('Should return an array with a length of 5', () => {
        const dec2019 = new Date;
        dec2019.setFullYear(2019);
        dec2019.setMonth(11);
        createCalendar(dec2019).should.have.lengthOf(5);
    });

    it ('Should have nested elements with length of 7.', () => {
        const jan2020 = new Date();
        jan2020.setFullYear(2020);
        jan2020.setMonth(0);
        createCalendar(jan2020).forEach(week => week.should.have.lengthOf(7));
    });

    it ('Each nested element should be of instance type Date', () => {
        const dec13_1996 = new Date();
        dec13_1996.setFullYear(1996);
        dec13_1996.setMonth(12);
        dec13_1996.setDate(13);
        createCalendar(dec13_1996).forEach(week => week.forEach(date => date.should.be.instanceOf(Date)));
    });

    it ('Should have each nested element greater than the last (ascending order calendar)', () => {
        // flatten the array
        // arr[i - 1] should be less than arr[i]
        const feb2022 = new Date();
        feb2022.setFullYear(2022);
        feb2022.setMonth(1);
        feb2022.setDate(1);
        let calendar = createCalendar(feb2022).flat();
        let i = 1;
        while (i < calendar.length) {
            calendar[i -1].should.be.below(calendar[i]);
            i++;
        }
    });

    it('Should should have Sunday Feb 28th as first calendar item and April 3rd as last calendar item for March 2020.', () => {
        const date = new Date();
        date.setFullYear(2021);
        date.setMonth(2);
        date.setDate(20);
        createCalendar(date)[0][0].getDate().should.equal(28);
        createCalendar(date)[4][6].getDate().should.equal(3);
    });
});

let calendar = createCalendar(new Date()).map(week => week.map(date => date.getDate()));