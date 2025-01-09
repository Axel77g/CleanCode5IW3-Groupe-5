import {AbstractEvent} from "../../../shared/AbstractEvent";
import {TestDriveDTO} from "../entities/TestDrive";
export class RegisterTestDriveEvent extends AbstractEvent {
    static type = "REGISTER_TEST_DRIVE"
    readonly type = RegisterTestDriveEvent.type;

    readonly streamId: string;
    readonly payload: TestDriveDTO;
    constructor(payload: TestDriveDTO) {
        super();
        this.streamId = `testDrive-${payload.testDriveId}`;
        this.payload = payload;
    }
}