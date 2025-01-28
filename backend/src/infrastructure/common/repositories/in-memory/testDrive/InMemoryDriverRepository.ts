import {AbstractInMemoryRepository} from "@infrastructure/common/repositories/in-memory/AbstractInMemoryRepository";
import {Driver} from "@domain/testDrive/entities/Driver";
import {DriverRepository} from "@application/testDrive/repositories/DriverRepository";
import {OptionalResult, PaginatedResult, Result, VoidResult} from "@shared/Result";
import {PaginatedInput} from "@shared/PaginatedInput";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";

export class InMemoryDriverRepository extends AbstractInMemoryRepository<Driver> implements DriverRepository{
    async getByLicenseId(driverLicenseId: DriverLicenseId): Promise<OptionalResult<Driver>> {
        const driver = this.collection.findOne('driverLicenseId',driverLicenseId);
        if(!driver) return Result.SuccessVoid();
        return Result.Success(driver);
    }

    async listDrivers(pagination: PaginatedInput): Promise<PaginatedResult<Driver>> {
        const {page, limit} = pagination;
        const drivers = this.collection.paginate(page,limit).toArray();
        const total = this.collection.count();
        return Result.SuccessPaginated(drivers,total,page,limit);
    }

    async store(driver: Driver): Promise<VoidResult> {
        this.collection.add(driver);
        return Result.SuccessVoid();
    }

}