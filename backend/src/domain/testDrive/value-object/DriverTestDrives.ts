import {Driver} from "../entities/Driver";
import {TestDrive} from "../entities/TestDrive";

export class DriverTestDrives{
    constructor(
        private readonly driver : Driver,
        private readonly testDrives : TestDrive[],
    ) {}


    add(testDrive: TestDrive): void {
        this.testDrives.push(testDrive);
    }

    remove(testDrive: TestDrive): void {
        const index = this.testDrives.indexOf(testDrive);
        if(index !== -1) {
            this.testDrives.splice(index, 1);
        }
    }
}