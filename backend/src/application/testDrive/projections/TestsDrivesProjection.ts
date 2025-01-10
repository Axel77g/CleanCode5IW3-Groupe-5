import {IProjection} from "@shared/IProjection";
import {IEvent} from "@shared/AbstractEvent";
import {TestDriveRepository} from "../repositories/TestDriveRepository";
import {RegisterTestDriveEvent} from "@domain/testDrive/Events/RegisterTestDriveEvent";
import {TestDrive} from "@domain/testDrive/entities/TestDrive";
import {EventObserver} from "@infrastructure/common/observers/EventObserver";

export class TestsDrivesProjection implements IProjection{
    constructor(private _testDriveRepository: TestDriveRepository, _eventObserver : EventObserver) {
        _eventObserver.subscribe(RegisterTestDriveEvent.type, this.receive.bind(this))
    }
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