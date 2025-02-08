import {Driver} from "@domain/testDrive/entities/Driver";
import {DriverCreatedEvent} from "@domain/testDrive/Events/DriverCreatedEvent";
import {DriverUpdatedEvent} from "@domain/testDrive/Events/DriverUpdatedEvent";
import {DriverRepository} from "../repositories/DriverRepository";
import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {
    ProjectionJobScheduler
} from "@application/shared/projections/ProjectionJobScheduler";
import {Result, VoidResult} from "@shared/Result";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";

export class DriversProjection extends AbstractProjection {
    constructor(private _driverRepository: DriverRepository) {
        super()

    }

    init(projectionJobScheduler: ProjectionJobScheduler) {
        projectionJobScheduler.schedule(DriverCreatedEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(DriverUpdatedEvent.type, this.constructor.name)
    }

    bindEvents(){
        return {
            [DriverCreatedEvent.type]: this.applyDriverCreatedEvent,
            [DriverUpdatedEvent.type]: this.applyDriverUpdatedEvent
        }
    }

    async applyDriverCreatedEvent(event: DriverCreatedEvent) : Promise<VoidResult> {
        const driver = Driver.fromObject(event.payload)
        if(driver instanceof ApplicationException) return Result.Failure(driver)
        await this._driverRepository.store(driver)
        return Result.SuccessVoid()
    }

    async applyDriverUpdatedEvent(event : DriverUpdatedEvent) : Promise<VoidResult> {
        const driverLicenseId = DriverLicenseId.create(event.payload.driverLicenseId)
        if(driverLicenseId instanceof ApplicationException) return Result.Failure(driverLicenseId)
        const driverResponse = await  this._driverRepository.getByLicenseId(driverLicenseId)
        if(!driverResponse.success) return driverResponse
        if(driverResponse.empty) return Result.Failure(NotFoundEntityException.create("Driver not found during update projection, this should not happen, please check the event store"))
        const driver = Driver.fromObject({
            driverLicenseId: driverResponse.value.driverLicenseId.getValue(),
            firstName: event.payload.firstName || driverResponse.value.firstName,
            lastName: event.payload.lastName || driverResponse.value.lastName,
            email: event.payload.email || driverResponse.value.email,
            birthDate: driverResponse.value.birthDate,
            driverLicensedAt: driverResponse.value.driverLicensedAt,
            documents: []
        })
        if(driver instanceof ApplicationException) return Result.Failure(driver)
        await this._driverRepository.store(driver)
        return Result.SuccessVoid()
    }
}

