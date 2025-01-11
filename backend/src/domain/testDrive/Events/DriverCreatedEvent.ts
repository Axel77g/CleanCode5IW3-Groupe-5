import {AbstractEvent} from "@shared/AbstractEvent";
import {DriverDTO} from "../entities/Driver";

export class DriverCreatedEvent extends AbstractEvent{
    static type = "DRIVER_CREATED"
    readonly type = DriverCreatedEvent.type;

    readonly streamId: string;
    readonly payload: DriverDTO;

    constructor(payload: DriverDTO) {
        super();
        this.streamId = `driver-${payload.driverLicenseId}`
        this.payload = payload;
    }
}