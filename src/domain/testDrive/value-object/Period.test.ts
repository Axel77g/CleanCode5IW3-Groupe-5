import {assertError} from "@tests/Utils";
import {ApplicationException} from "@shared/ApplicationException";
import {Period} from "@domain/testDrive/value-object/Period";

describe("Period", () => {
    describe("create", () => {
        it("should create a valid Period when the start date is before the end date", () => {
            const startDate = new Date("2025-01-01");
            const endDate = new Date("2025-01-31");
            const period = Period.create(startDate, endDate);
            expect(period).toBeInstanceOf(Period);
            expect((period as Period).startDate).toEqual(startDate);
            expect((period as Period).endDate).toEqual(endDate);
        });

        it("should return an ApplicationException when the start date is after the end date", () => {
            const startDate = new Date("2025-01-31");
            const endDate = new Date("2025-01-01");
            const period = Period.create(startDate, endDate);
            expect(period).toBeInstanceOf(ApplicationException);
            assertError(period as ApplicationException, Period.errors.INVALID_PERIOD);
        });
    });

    describe("isOverlapping", () => {
        it("should return true when the periods are overlapping", () => {
            const period1 = Period.create(new Date("2025-01-01"), new Date("2025-01-31")) as Period;
            const period2 = Period.create(new Date("2025-01-15"), new Date("2025-02-15")) as Period;
            expect(period1.isOverlapping(period2)).toBe(true);
        });

        it("should return false when the periods are not overlapping", () => {
            const period1 = Period.create(new Date("2025-01-01"), new Date("2025-01-31")) as Period;
            const period2 = Period.create(new Date("2025-02-01"), new Date("2025-02-15")) as Period;
            expect(period1.isOverlapping(period2)).toBe(false);
        });
    });
});