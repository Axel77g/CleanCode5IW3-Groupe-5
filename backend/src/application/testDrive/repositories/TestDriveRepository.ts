import {IRepository} from "@shared/IRepository";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {PaginatedInput} from "@shared/PaginatedInput";
import {PaginatedResult, Result, VoidResult} from "@shared/Result";
import {TestDrive} from "@domain/testDrive/entities/TestDrive";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {VehiculeDisponibilityAggregate} from "@domain/testDrive/aggregates/VehiculeDisponibilityAggregate";

export interface TestDriveRepository extends IRepository{
    listDriverTestDrives(driverLicenseId: DriverLicenseId, pagination : PaginatedInput): Promise<PaginatedResult<TestDrive>>;
    store(testDrive: TestDrive): Promise<VoidResult>;
    getVehiculeDisponibilities(immatriculation: VehiculeImmatriculation): Promise<Result<VehiculeDisponibilityAggregate>>;
}