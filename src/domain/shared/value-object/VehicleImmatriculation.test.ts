import { ApplicationException } from "@shared/ApplicationException";
import {assertError} from "@tests/Utils";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";

describe("VehicleImmatriculation", () => {
    describe("create", () => {
        it("should create a valid VehicleImmatriculation when the format is correct", () => {
            const immatriculation = "AB-123-CD";
            const vehicleImmatriculation = VehicleImmatriculation.create(immatriculation);

            expect(vehicleImmatriculation).toBeInstanceOf(VehicleImmatriculation);
            expect((vehicleImmatriculation as VehicleImmatriculation).getValue()).toEqual(immatriculation);
        });

        it("should return an ApplicationException when the format is invalid", () => {
            const invalidImmatriculation = "INVALID123";
            const vehicleImmatriculation = VehicleImmatriculation.create(invalidImmatriculation);

            expect(vehicleImmatriculation).toBeInstanceOf(ApplicationException);
            assertError(vehicleImmatriculation as ApplicationException, VehicleImmatriculation.errors.NOT_VALID);
        });

        it("should return an ApplicationException when immatriculation is empty", () => {
            const invalidImmatriculation = "";
            const vehicleImmatriculation = VehicleImmatriculation.create(invalidImmatriculation);

            expect(vehicleImmatriculation).toBeInstanceOf(ApplicationException);
            assertError(vehicleImmatriculation as ApplicationException, VehicleImmatriculation.errors.NOT_VALID);
        });
    });
});
