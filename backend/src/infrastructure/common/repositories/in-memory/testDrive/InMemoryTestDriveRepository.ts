import {AbstractInMemoryRepository} from "@infrastructure/common/repositories/in-memory/AbstractInMemoryRepository";
import {TestDrive} from "@domain/testDrive/entities/TestDrive";
import {TestDriveRepository} from "@application/testDrive/repositories/TestDriveRepository";
import { DriverLicenseId } from "@domain/testDrive/value-object/DriverLicenseId";
import { PaginatedInput } from "@shared/PaginatedInput";
import {PaginatedResult, Result, VoidResult} from "@shared/Result";

export class InMemoryTestDriveRepository extends AbstractInMemoryRepository<TestDrive> implements TestDriveRepository {
    async listDriverTestDrives(driverLicenseId: DriverLicenseId, pagination: PaginatedInput): Promise<PaginatedResult<TestDrive>> {
        const {page,limit} = pagination;
        const driverTestDrives = this.collection
            .filter(testDrive => testDrive.driverLicenseId.getValue() == driverLicenseId.getValue());
        const paginatedTestDrives = driverTestDrives.paginate(page, limit).toArray();
        const total = driverTestDrives.count()
        return Result.SuccessPaginated(paginatedTestDrives, total, page, limit);
    }
    async store(testDrive: TestDrive): Promise<VoidResult> {
        this.collection.add(testDrive);
        return Result.SuccessVoid();
    }

}