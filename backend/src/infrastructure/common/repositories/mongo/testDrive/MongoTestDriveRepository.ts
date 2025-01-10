import {AbstractMongoRepository} from "../AbstractMongoRepository";
import {TestDriveRepository} from "../../../../../application/testDrive/repositories/TestDriveRepository";
import {DriverLicenseId} from "../../../../../domain/testDrive/value-object/DriverLicenseId";
import {PaginatedInput} from "../../../../../shared/PaginatedInput";
import {PaginatedResult, Result, VoidResult} from "../../../../../shared/Result";
import {TestDrive} from "../../../../../domain/testDrive/entities/TestDrive";
import {TestDriveMapper} from "../../../entityMappers/TestDriveMapper";

export class MongoTestDriveRepository extends AbstractMongoRepository implements TestDriveRepository{
    protected collectionName: string = 'testDrives';

    async listDriverTestDrives(driverLicenseId: DriverLicenseId, pagination: PaginatedInput): Promise<PaginatedResult<TestDrive>> {
        const {page, limit} = pagination;
        try{
            const testDrivesDocuments = await this.getQuery().find({driverLicenseId: driverLicenseId.getValue()})
                .skip((page - 1) * limit)
                .limit(limit)
                .toArray();
            const total = await this.getQuery().countDocuments({driverLicenseId: driverLicenseId.getValue()});
            const testDrives = TestDriveMapper.toDomainList(testDrivesDocuments);
            return Result.SuccessPaginated<TestDrive>(testDrives, total, page, limit);
        }catch (e){
            const message = e instanceof Error ? e.message : "An error occurred while fetching test drives";
            return Result.FailureStr(message);
        }
    }

    async store(testDrive: TestDrive): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        try{
            session.startTransaction();
            await this.getQuery().updateOne({testDriveId: testDrive.testDriveId}, {$set: TestDriveMapper.toPersistence(testDrive)}, {upsert: true});
            await session.commitTransaction();
            return Result.SuccessVoid();
        }catch (e){
            console.error(e);
            await session.abortTransaction();
            const message = e instanceof Error ? e.message : "An error occurred while storing test drive";
            return Result.FailureStr(message);
        }
    }

}