import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {IEvent} from "@shared/AbstractEvent";
import {TestDriveRepository} from "../repositories/TestDriveRepository";
import {RegisterTestDriveEvent} from "@domain/testDrive/Events/RegisterTestDriveEvent";
import {TestDrive} from "@domain/testDrive/entities/TestDrive";
import {ProjectionJobScheduler} from "@application/shared/projections/ProjectionJobScheduler";
import {Result, VoidResult} from "@shared/Result";

export class TestsDrivesProjection extends AbstractProjection{
    constructor(private _testDriveRepository: TestDriveRepository) {
        super()
    }
    init(projectionJobScheduler: ProjectionJobScheduler) {
        projectionJobScheduler.schedule(RegisterTestDriveEvent.type, this.constructor.name)
    }

    bindEvents(){
        return {
            [RegisterTestDriveEvent.type]: this.applyIncidentCreatedEvent
        }
    }

    async applyIncidentCreatedEvent(event: RegisterTestDriveEvent) : Promise<VoidResult> {
        const testDrive = TestDrive.fromObject(event.payload)
        if(testDrive instanceof Error) return Result.Failure(testDrive)
        await this._testDriveRepository.store(testDrive)
        return Result.SuccessVoid()
    }
}