import {IEvent} from "../../../shared/AbstractEvent";
import {Driver} from "../../../domain/testDrive/entities/Driver";
import {DriverCreatedEvent} from "../../../domain/testDrive/Events/DriverCreatedEvent";
import {DriverUpdatedEvent} from "../../../domain/testDrive/Events/DriverUpdatedEvent";
import {DriverRepository} from "../repositories/DriverRepository";

interface Projection{
    receive(events: IEvent[]) : void
}

export class DriversProjection implements Projection {
    constructor(private _driverRepository: DriverRepository) {}
    receive(events: IEvent[]) {
        events.forEach(async (event) => {
            switch (event.constructor) {
                case DriverCreatedEvent:
                    await this.applyDriverCreatedEvent(event as DriverCreatedEvent)
                    break;
                case DriverUpdatedEvent:
                    await this.applyDriverUpdatedEvent(event as DriverUpdatedEvent)
                    break;
            }
        })
    }

    async applyDriverCreatedEvent(event: DriverCreatedEvent) {
        await this._driverRepository.store(event.payload)
    }

    async applyDriverUpdatedEvent(event : DriverUpdatedEvent) {
        const driverResponse = await  this._driverRepository.getByLicenseId(event.payload.driverLicenseId)
        if(!driverResponse.success) return;
        let driver = {
            ...driverResponse.value,
            ...event.payload
        }
        await this._driverRepository.store(driver)
    }
}

