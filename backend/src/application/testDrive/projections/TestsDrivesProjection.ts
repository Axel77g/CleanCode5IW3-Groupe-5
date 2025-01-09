import {IProjection} from "../../../shared/IProjection";
import {IEvent} from "../../../shared/AbstractEvent";
import {TestDriveRepository} from "../repositories/TestDriveRepository";
import {RegisterTestDriveEvent} from "../../../domain/testDrive/Events/RegisterTestDriveEvent";
import {TestDrive} from "../../../domain/testDrive/entities/TestDrive";

export class TestsDrivesProjection implements IProjection{
    constructor(private _testDriveRepository: TestDriveRepository) {}
    async receive(event: IEvent) : Promise<void> {
        switch (event.constructor) {
            case RegisterTestDriveEvent:
                await this.applyIncidentCreatedEvent(event as RegisterTestDriveEvent)
                break;
        }
    }

    async applyIncidentCreatedEvent(event: RegisterTestDriveEvent) {
        const testDrive = TestDrive.fromObject(event.payload)
        if(testDrive instanceof Error) return console.error(testDrive)
        await this._testDriveRepository.store(testDrive)
    }
}