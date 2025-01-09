import {AbstractMongoRepository} from "../AbstractMongoRepository";
import {DriverRepository} from "../../../../../application/testDrive/repositories/DriverRepository";
import { Driver } from "../../../../../domain/testDrive/entities/Driver";
import { PaginatedInput } from "../../../../../shared/PaginatedInput";
import { VoidResult, Result, PaginatedResult } from "../../../../../shared/Result";
import {DriverMapper} from "../../../entityMappers/DriverMapper";

export class MongoDriverRepository extends AbstractMongoRepository implements DriverRepository {
    protected collectionName = "drivers";

    async store(driver: any): Promise<VoidResult> {
        const session = this.getSessionTransaction()
        try{
            session.startTransaction()
            await this.getQuery().replaceOne({
                filter:{
                    driverLicenseId: driver.driverLicenseId
                }
            }, driver)
            await session.commitTransaction()
            return Result.SuccessVoid()
        }catch (e){
            await session.abortTransaction()
            const message = e instanceof Error ? e.message : 'An error occured'
            return Result.FailureStr(message)
        }
    }
    async getByLicenseId(driverLicenseId: string): Promise<Result<Driver>> {
        try{
            const driverDocument = await this.getQuery().findOne({
                filter:{
                    driverLicenseId
                }
            })
            return Result.Success<Driver>(DriverMapper.toDomain(driverDocument))
        }catch (e){
            const message = e instanceof Error ? e.message : "An error occurred"
            console.error(e)
            return Result.FailureStr(message)
        }
    }

    async listDrivers(pagination: PaginatedInput): Promise<PaginatedResult<Driver>> {
        const {limit, page}  = pagination
         try{
             const driversDocuments = await this.getQuery().aggregate([
                 {
                     $skip: limit * page
                 },
                 {
                     $limit: limit
                 }
             ])
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