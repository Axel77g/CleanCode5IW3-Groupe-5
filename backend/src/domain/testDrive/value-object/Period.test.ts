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
});