import {VehicleImmatriculation} from "../../shared/value-object/VehicleImmatriculation";
import {Period} from "../value-object/Period";
import {DriverLicenseId} from "../value-object/DriverLicenseId";

export class TestDrive{
    constructor(
        private readonly driverLicenseId: DriverLicenseId,
        private readonly vehicleImmatriculation: VehicleImmatriculation,
        private readonly period : Period
    ) {}

}