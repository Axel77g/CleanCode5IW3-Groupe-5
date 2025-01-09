import {IEvent} from "../../../shared/AbstractEvent";
import {Driver} from "../../../domain/testDrive/entities/Driver";
import {DriverCreatedEvent} from "../../../domain/testDrive/Events/DriverCreatedEvent";
import {DriverUpdatedEvent} from "../../../domain/testDrive/Events/DriverUpdatedEvent";
import {DriverRepository} from "../repositories/DriverRepository";
import {IProjection} from "../../../shared/IProjection";

export class DriversProjection implements IProjection {
    constructor(private _driverRepository: DriverRepository) {}
    async receive(event: IEvent) : Promise<void> {
        switch (event.constructor) {
            case DriverCreatedEvent:
                await this.applyDriverCreatedEvent(event as DriverCreatedEvent)
                break;
            case DriverUpdatedEvent:
                await this.applyDriverUpdatedEvent(event as DriverUpdatedEvent)
                break;
        }
    }

    async applyDriverCreatedEvent(event: DriverCreatedEvent) {
        const driver = Driver.fromObject(event.payload)
        if(driver instanceof Error) return console.error(driver)
        await this._driverRepository.store(driver)
    }

    async applyDriverUpdatedEvent(event : DriverUpdatedEvent) {
        const driverResponse = await  this._driverRepository.getByLicenseId(event.payload.driverLicenseId)
        if(!driverResponse.success) return console.error(driverResponse.error)
        const driver = Driver.fromObject({
            driverLicenseId: driverResponse.value.driverLicenseId.getValue(),
            firstName: event.payload.firstName || driverResponse.value.firstName,
            lastName: event.payload.lastName || driverResponse.value.lastName,
            email: event.payload.email || driverResponse.value.email,
            driverLicensedAt: new Date(driverResponse.value.driverLicensedAt),
            documents: []
        })
        if(driver instanceof Error) return console.error(driver)
        await this._driverRepository.store(driver)
    }
}

