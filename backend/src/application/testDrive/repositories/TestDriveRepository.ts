import {IRepository} from "@shared/IRepository";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {PaginatedInput} from "@shared/PaginatedInput";
import {PaginatedResult, Result, VoidResult} from "@shared/Result";
import {TestDrive} from "@domain/testDrive/entities/TestDrive";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {VehicleDisponibilityAggregate} from "@domain/testDrive/aggregates/VehicleDisponibilityAggregate";

export interface TestDriveRepository extends IRepository{
    listDriverTestDrives(driverLicenseId: DriverLicenseId, pagination : PaginatedInput): Promise<PaginatedResult<TestDrive>>;
    store(testDrive: TestDrive): Promise<VoidResult>;
    getVehicleDisponibilities(immatriculation: VehicleImmatriculation): Promise<Result<VehicleDisponibilityAggregate>>;
}