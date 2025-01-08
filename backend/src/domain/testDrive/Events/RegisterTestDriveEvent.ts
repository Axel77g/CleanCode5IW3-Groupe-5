import {AbstractEvent} from "../../../shared/AbstractEvent";
import {Period} from "../value-object/Period";

export interface RegisterTestDriveEvent extends AbstractEvent {
    testDriveId: string;
    driverLicenseId: string;
    vehicleImmatriculation: string;
    period: Period;
}