export class Period{
    constructor(
        public readonly startDate: Date,
        public readonly endDate: Date
    ) {}

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