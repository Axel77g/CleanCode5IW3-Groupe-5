import {AbstractKnexRepository} from "../AbstractKnexRepository";
import {DriverRepository} from "../../../../application/testDrive/repositories/DriverRepository";
import { Driver } from "../../../../domain/testDrive/entities/Driver";
import { DriverLicenseId } from "../../../../domain/testDrive/value-object/DriverLicenseId";
import { PaginatedInput } from "../../../../shared/PaginatedInput";
import { VoidResult, Result, PaginatedResult } from "../../../../shared/Result";
import {DriverMapper} from "../../../entityMappers/DriverMapper";

export class KnexDriverRepository extends AbstractKnexRepository implements DriverRepository {
    tableName = 'drivers';

    async store(driver: Driver): Promise<VoidResult> {
        const transaction =  await this.connection.transaction();
        try{
            this.getQuery()
                .transacting(transaction)
                .insert(DriverMapper.toPersistence(driver));

            transaction.commit();
            return Result.SuccessVoid();
        }catch (error){
            const message = error instanceof Error ? error.message : "Unknown Error";
            return Result.FailureStr(message);
        }
    }
    async update(driver: Driver): Promise<VoidResult> {
        const transaction =  await this.connection.transaction();
        try{
            this.getQuery()
                .transacting(transaction)
                .where('driver_licence_id', driver.driverLicenceId.getValue())
                .update(
                    DriverMapper
                        .toPersistence(driver)
                        .except(['driver_licence_id','driver_licensed_at'])
                );
            transaction.commit();
            return Result.SuccessVoid();
        }catch (error){
            const message = error instanceof Error ? error.message : "Unknown Error";
            return Result.FailureStr(message);
        }
    }
    async getByLicenseId(driverLicenseId: DriverLicenseId): Promise<Result<Driver>> {
        try{
            const driver = await this.getQuery()
                .where('driver_licence_id', driverLicenseId.getValue())
                .select('*')
                .first() as any;
            if(!driver){
                return Result.FailureStr("Driver not found");
            }
            return Result.Success<Driver>(DriverMapper.toDomain(driver));
        }catch(error){
            const message = error instanceof Error ? error.message : "Unknown Error";
            return Result.FailureStr(message);
        }
    }
    async listDrivers(pagination: PaginatedInput): Promise<PaginatedResult<Driver>> {
        const {page, limit} = pagination;
        try{
            const drivers = await this.getQuery()
                .select('*')
                .limit(limit)
                .offset((page - 1) * limit) as any[];
            const total = await this.getQuery().count('* as total').first() as any;
            const driverList = DriverMapper.toDomainList(drivers);
            return Result.SuccessPaginated<Driver>(driverList, total.total, page, limit)
        }catch (error){
            const message = error instanceof Error ? error.message : "Unknown Error";
            return Result.FailureStr(message);
        }
    }
}