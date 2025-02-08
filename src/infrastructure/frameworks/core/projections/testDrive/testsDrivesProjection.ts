import {TestsDrivesProjection} from "@application/testDrive/projections/TestsDrivesProjection";
import {testDriveRepository} from "@infrastructureCore/repositories/testDrive/testDriveRepository";
export const testsDrivesProjection = new TestsDrivesProjection(testDriveRepository)