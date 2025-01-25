import { ApplicationException } from "@shared/ApplicationException";
import {assertError} from "@tests/Utils";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";

describe("VehicleImmatriculation", () => {
    describe("create", () => {
        it("should create a valid VehicleImmatriculation when the format is correct", () => {
            const immatriculation = "AB-123-CD";
            const vehicleImmatriculation = VehiculeImmatriculation.create(immatriculation);

            expect(vehicleImmatriculation).toBeInstanceOf(VehiculeImmatriculation);
            expect((vehicleImmatriculation as VehiculeImmatriculation).getValue()).toEqual(immatriculation);
        });

        it("should return an ApplicationException when the format is invalid", () => {
            const invalidImmatriculation = "INVALID123";
            const vehicleImmatriculation = VehiculeImmatriculation.create(invalidImmatriculation);

            expect(vehicleImmatriculation).toBeInstanceOf(ApplicationException);
            assertError(vehicleImmatriculation as ApplicationException, VehiculeImmatriculation.errors.NOT_VALID);
        });

        it("should return an ApplicationException when immatriculation is empty", () => {
            const invalidImmatriculation = "";
            const vehicleImmatriculation = VehiculeImmatriculation.create(invalidImmatriculation);

            expect(vehicleImmatriculation).toBeInstanceOf(ApplicationException);
            assertError(vehicleImmatriculation as ApplicationException, VehiculeImmatriculation.errors.NOT_VALID);
        });
    });
});
