import {TestsDrivesProjection} from "@application/testDrive/projections/TestsDrivesProjection";
import {testDriveRepository} from "@expressApp/repositories/testDrive/testDriveRepository";
import {eventObserver} from "@expressApp/observers/eventObserver";

export const testsDrivesProjection = new TestsDrivesProjection(testDriveRepository, eventObserver)