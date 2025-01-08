import {AbstractKnexRepository} from "../AbstractKnexRepository";
import {TestDriveRepository} from "../../../../application/testDrive/repositories/TestDriveRepository";
import { TestDrive } from "../../../../domain/testDrive/entities/TestDrive";
import { DriverLicenseId } from "../../../../domain/testDrive/value-object/DriverLicenseId";
import { PaginatedInput } from "../../../../shared/PaginatedInput";
import {PaginatedResult, Result, VoidResult} from "../../../../shared/Result";
import {TestDriveMapper} from "../../../entityMappers/TestDriveMapper";

export class KnexTestDriveRepository extends AbstractKnexRepository implements TestDriveRepository {
    tableName = 'test_drives';

    async listDriverTestDrives(driverLicenseId: DriverLicenseId, pagination: PaginatedInput): Promise<PaginatedResult<TestDrive>> {
        const {page, limit} = pagination;
        try{
            const testDrives = await this.getQuery()
                .where('driver_licence_id', driverLicenseId.getValue())
                .select('*')
                .offset(page)
                .limit(limit) as any[];

            const total = await this.getQuery()
                .where('driver_licence_id', driverLicenseId.getValue())
                .count('* as total').first() as any;

            const mappedTestDrives = TestDriveMapper.toDomainList(testDrives);
            return Result.SuccessPaginated(mappedTestDrives, total.total, page, limit);
        }catch (error){
            const message = error instanceof Error ? error.message : "Unknown Error";
            return Result.FailureStr(message);
        }
    }
    async store(testDrive: TestDrive): Promise<VoidResult> {
        const transaction = await this.connection.transaction()
        try{
            await transaction
                .insert(TestDriveMapper.toPersistence(testDrive))
                .into(this.tableName);
            transaction.commit();
            return Result.SuccessVoid();
        }catch (error){
            const message = error instanceof Error ? error.message : "Unknown Error";
            return Result.FailureStr(message);
        }
    }
}