import {VehicleImmatriculation} from "../../shared/value-object/VehicleImmatriculation";
import {Period} from "../value-object/Period";
import {DriverLicenseId} from "../value-object/DriverLicenseId";

export class TestDrive{
    constructor(
        public readonly id: string,
        public readonly driverLicenseId: DriverLicenseId,
        public readonly vehicleImmatriculation: VehicleImmatriculation,
        public readonly period : Period
    ) {}

}