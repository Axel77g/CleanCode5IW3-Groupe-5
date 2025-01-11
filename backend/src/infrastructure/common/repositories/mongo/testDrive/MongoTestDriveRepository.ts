import {AbstractMongoRepository} from "../AbstractMongoRepository";
import {TestDriveRepository} from "@application/testDrive/repositories/TestDriveRepository";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {PaginatedInput} from "@shared/PaginatedInput";
import {PaginatedResult, Result, VoidResult} from "@shared/Result";
import {TestDrive} from "@domain/testDrive/entities/TestDrive";
import {TestDriveMapper} from "@infrastructure/common/entityMappers/TestDriveMapper";

export class MongoTestDriveRepository extends AbstractMongoRepository implements TestDriveRepository{
    protected collectionName: string = 'testDrives';

    async listDriverTestDrives(driverLicenseId: DriverLicenseId, pagination: PaginatedInput): Promise<PaginatedResult<TestDrive>> {
        const {page, limit} = pagination;
        return this.catchError(
            async () => {
                const testDrivesDocuments = await this.getQuery().find({driverLicenseId: driverLicenseId.getValue()})
                    .skip((page - 1) * limit)
                    .limit(limit)
                const total = await this.getQuery().countDocuments({driverLicenseId: driverLicenseId.getValue()});
                const testDrives = TestDriveMapper.toDomainList(await testDrivesDocuments.toArray());
                return Result.SuccessPaginated<TestDrive>(testDrives, total, page, limit);
            },
        )
    }

    async store(testDrive: TestDrive): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getQuery().updateOne({testDriveId: testDrive.testDriveId}, {$set: TestDriveMapper.toPersistence(testDrive)}, {upsert: true});
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session)
        )
    }

}