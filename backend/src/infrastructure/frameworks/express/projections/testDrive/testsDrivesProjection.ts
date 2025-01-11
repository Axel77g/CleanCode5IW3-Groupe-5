import {TestsDrivesProjection} from "@application/testDrive/projections/TestsDrivesProjection";
import {testDriveRepository} from "@expressApp/repositories/testDrive/testDriveRepository";
export const testsDrivesProjection = new TestsDrivesProjection(testDriveRepository)