import { TestDriveRepository } from "@application/testDrive/repositories/TestDriveRepository";
import { VehicleImmatriculation } from "@domain/maintenance/value-object/VehicleImmatriculation";
import {TestDrive} from "@domain/testDrive/entities/TestDrive";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {Period} from "@domain/testDrive/value-object/Period";
import {TestDriveMapper} from "@infrastructure/common/entityMappers/TestDriveMapper";
import {PaginatedInput} from "@shared/PaginatedInput";
import {PaginatedResult, Result, VoidResult} from "@shared/Result";
import {AbstractMongoRepository} from "../AbstractMongoRepository";
import {ApplicationException} from "@shared/ApplicationException";
import {VehicleDisponibilityAggregate} from "@domain/testDrive/aggregates/VehicleDisponibilityAggregate";

export class MongoTestDriveRepository extends AbstractMongoRepository implements TestDriveRepository {

    protected collectionName: string = 'testDrives';

    async listDriverTestDrives(driverLicenseId: DriverLicenseId, pagination: PaginatedInput): Promise<PaginatedResult<TestDrive>> {
        const { page, limit } = pagination;
        return this.catchError(
            async () => {
                const testDrivesDocuments = await this.getCollection().find({ driverLicenseId: driverLicenseId.getValue() })
                    .skip((page - 1) * limit)
                    .limit(limit)
                const total = await this.getCollection().countDocuments({ driverLicenseId: driverLicenseId.getValue() });
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
                await this.getCollection().updateOne({ testDriveId: testDrive.testDriveId }, { $set: TestDriveMapper.toPersistence(testDrive) }, { upsert: true });
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session)
        )
    }

     getVehicleDisponibilities(immatriculation: VehicleImmatriculation): Promise<Result<VehicleDisponibilityAggregate>> {
        return this.catchError(async()=>{
            const testDrivePeriodsDocuments = await this.getCollection().find({
                vehicleImmatriculation: immatriculation.getValue(),
            },{
                projection : {
                    periodStart:1,
                    periodEnd:1
                }
            }).toArray()

            const testDrivePeriods = testDrivePeriodsDocuments.map((testDrivePeriodDocument : any)=>{
                const period = Period.create(testDrivePeriodDocument.periodStart, testDrivePeriodDocument.periodEnd)
                if(period instanceof ApplicationException) return false
                return period
            }).filter(Boolean) as Period[]

            return Result.Success(new VehicleDisponibilityAggregate(testDrivePeriods))
        })
     }

}