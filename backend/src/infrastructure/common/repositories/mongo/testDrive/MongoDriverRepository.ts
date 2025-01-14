import { DriverRepository } from "@application/testDrive/repositories/DriverRepository";
import { Driver } from "@domain/testDrive/entities/Driver";
import { DriverMapper } from "@infrastructure/common/entityMappers/DriverMapper";
import { PaginatedInput } from "@shared/PaginatedInput";
import { PaginatedResult, Result, VoidResult } from "@shared/Result";
import { AbstractMongoRepository } from "../AbstractMongoRepository";

export class MongoDriverRepository extends AbstractMongoRepository implements DriverRepository {
    protected collectionName = "drivers";

    store(driver: Driver): Promise<VoidResult> {
        const session = this.getSessionTransaction()
        return this.catchError(
            async () => {
                session.startTransaction()
                await this.getCollection()
                    .updateOne({ driverLicenseId: driver.driverLicenseId.getValue() }, { $set: DriverMapper.toPersistence(driver) }, { upsert: true });
                await session.commitTransaction()
                return Result.SuccessVoid()
            },
            session.abortTransaction.bind(session)
        )
    }
    getByLicenseId(driverLicenseId: string): Promise<Result<Driver>> {
        return this.catchError(
            async () => {
                const driverDocument = await this.getCollection().findOne({ driverLicenseId: driverLicenseId })
                if (!driverDocument) return Result.FailureStr("Driver not found")
                const driver = DriverMapper.toDomain(driverDocument)
                if (driver instanceof Error) return Result.Failure(driver)
                return Result.Success<Driver>(driver)
            }
        )
    }

    async listDrivers(pagination: PaginatedInput): Promise<PaginatedResult<Driver>> {
        const { limit, page } = pagination
        return this.catchError(
            async () => {
                const driversDocuments = await this.getCollection().find().skip((page - 1) * limit).limit(limit)
                const total = await this.getCollection().countDocuments({})
                const drivers = DriverMapper.toDomainList(await driversDocuments.toArray())
                return Result.SuccessPaginated<Driver>(drivers, total, page, limit)
            }
        )
    }
}