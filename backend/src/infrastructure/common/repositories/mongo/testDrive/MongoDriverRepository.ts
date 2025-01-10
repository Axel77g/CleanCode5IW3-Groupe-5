import {AbstractMongoRepository} from "../AbstractMongoRepository";
import {DriverRepository} from "@application/testDrive/repositories/DriverRepository";
import {Driver} from "@domain/testDrive/entities/Driver";
import { PaginatedInput } from "@shared/PaginatedInput";
import { VoidResult, Result, PaginatedResult } from "@shared/Result";
import {DriverMapper} from "@infrastructure/common/entityMappers/DriverMapper";

export class MongoDriverRepository extends AbstractMongoRepository implements DriverRepository {
    protected collectionName = "drivers";

    async store(driver: Driver): Promise<VoidResult> {
        const session = this.getSessionTransaction()
        try{
            session.startTransaction()
            await this.getQuery()
                .updateOne( { driverLicenseId: driver.driverLicenseId.getValue() }, { $set: DriverMapper.toPersistence(driver) }, { upsert: true } );
            await session.commitTransaction()
            return Result.SuccessVoid()
        }catch (e){
            console.error(e)
            await session.abortTransaction()
            const message = e instanceof Error ? e.message : 'An error occurred'
            return Result.FailureStr(message)
        }
    }
    async getByLicenseId(driverLicenseId: string): Promise<Result<Driver>> {
        try{
            const driverDocument = await this.getQuery().findOne({ driverLicenseId: driverLicenseId })
            if(!driverDocument) return Result.FailureStr("Driver not found")
            const driver = DriverMapper.toDomain(driverDocument)
            if(driver instanceof Error) return Result.Failure(driver)
            return Result.Success<Driver>(driver)
        }catch (e){
            const message = e instanceof Error ? e.message : "An error occurred"
            console.error(e)
            return Result.FailureStr(message)
        }
    }

    async listDrivers(pagination: PaginatedInput): Promise<PaginatedResult<Driver>> {
        const {limit, page}  = pagination
         try{
             const driversDocuments = await this.getQuery().find().skip((page - 1) * limit).limit(limit)
             const total = await this.getQuery().countDocuments({})
             const drivers = DriverMapper.toDomainList(await driversDocuments.toArray())
             return Result.SuccessPaginated<Driver>(drivers, total, page, limit)
         }catch (e){
             const message = e instanceof Error ? e.message : "An error occurred"
             console.error(e)
             return Result.FailureStr(message)
         }
    }
}