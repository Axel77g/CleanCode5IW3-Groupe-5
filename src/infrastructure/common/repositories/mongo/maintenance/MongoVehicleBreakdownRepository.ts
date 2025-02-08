import {AbstractMongoRepository} from "@infrastructure/common/repositories/mongo/AbstractMongoRepository";
import {VehicleBreakdownRepository} from "@application/maintenance/repositories/VehicleBreakdownRepository";
import {VehicleBreakdown} from "@domain/maintenance/entities/VehicleBreakdown";
import {OptionalResult, PaginatedResult, Result, VoidResult} from "@shared/Result";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {VehicleBreakdownMapper} from "@infrastructure/common/entityMappers/VehicleBreakdownMapper";
import {PaginatedInput} from "@shared/PaginatedInput";

export class MongoVehicleBreakdownRepository extends AbstractMongoRepository implements VehicleBreakdownRepository {
    protected collectionName: string = "vehicles-breakdowns";
    async store(vehicleBreakdown: VehicleBreakdown): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().updateOne(
                    { immatriculation: vehicleBreakdown.vehicleBreakdownId },
                    { $set: VehicleBreakdownMapper.toPersistence(vehicleBreakdown) },
                    { upsert: true }
                );
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session)
        )
    }

    getBreakdownById(vehicleBreakdownId: string): Promise<OptionalResult<VehicleBreakdown>> {
        return this.catchError(
           async () => {
               const vehicleBreakdownDocument = await this.getCollection().findOne({vehicleBreakdownId: vehicleBreakdownId});
               if (!vehicleBreakdownDocument) return Result.SuccessVoid();
               const vehicleBreakdown = VehicleBreakdownMapper.toDomain(vehicleBreakdownDocument);
                if (vehicleBreakdown instanceof Error) return Result.Failure(vehicleBreakdown);
                return Result.Success<VehicleBreakdown>(vehicleBreakdown);
           }
        )
    }

    async listVehicleBreakdowns(vehicleImmatriculation: VehicleImmatriculation, pagination:PaginatedInput): Promise<PaginatedResult<VehicleBreakdown>> {
        const {page, limit} = pagination;
        return this.catchError(
            async () => {
                const breakdownsDocuments = await this.getCollection().find({vehicleImmatriculation: vehicleImmatriculation.getValue()})
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .toArray();
                const total = await this.getCollection().countDocuments({vehicleImmatriculation: vehicleImmatriculation.getValue()})
                const breakdowns = VehicleBreakdownMapper.toDomainList(breakdownsDocuments);
                return Result.SuccessPaginated<VehicleBreakdown>(breakdowns, total, page, limit);
            }
        )
    }
}