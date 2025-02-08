import {ApplicationException} from "@shared/ApplicationException";

export class Period{
    static errors = {
        INVALID_PERIOD : new ApplicationException("Period.invalidPeriod","The start date must be before the end date")
    }
    private constructor(
        public readonly startDate: Date,
        public readonly endDate: Date
    ) {}

    static create(startDate : Date, endDate : Date){
        if(endDate < startDate) {
            return Period.errors.INVALID_PERIOD
        }
        return new Period(startDate,endDate)
    }

    setStartDate(startDate: Date): Period {
        return new Period(startDate, this.endDate);
    }

    setEndDate(endDate: Date): Period {
        return new Period(this.startDate, endDate);
    }

    isOverlapping(period: Period): boolean {
        return this.startDate <= period.endDate && period.startDate <= this.endDate;
    }

    isBefore(period: Period): boolean {
        return this.endDate < period.startDate;
    }

    isAfter(period: Period): boolean {
        return this.startDate > period.endDate;
    }

    isDuring(period: Period): boolean {
        return this.startDate >= period.startDate && this.endDate <= period.endDate;
    }

    dateIsIncluded(date: Date): boolean {
        return this.startDate <= date && date <= this.endDate;
    }
}