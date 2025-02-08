import {AbstractInMemoryRepository} from "@infrastructure/common/repositories/in-memory/AbstractInMemoryRepository";
import {VehicleBreakdown} from "@domain/maintenance/entities/VehicleBreakdown";
import {VehicleBreakdownRepository} from "@application/maintenance/repositories/VehicleBreakdownRepository";
import {OptionalResult, PaginatedResult, Result, VoidResult} from "@shared/Result";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {PaginatedInput} from "@shared/PaginatedInput";

export class InMemoryVehicleBreakdownRepository extends AbstractInMemoryRepository<VehicleBreakdown> implements VehicleBreakdownRepository {
    async getBreakdownById(vehicleBreakdownId: string): Promise<OptionalResult<VehicleBreakdown>> {
        const vehicleBreakdown = this.collection.findOne('vehicleBreakdownId', vehicleBreakdownId);
        return vehicleBreakdown ? Result.Success(vehicleBreakdown) : Result.SuccessVoid();
    }
    async listVehicleBreakdowns(vehicleImmatriculation: VehicleImmatriculation, pagination: PaginatedInput): Promise<PaginatedResult<VehicleBreakdown>> {
        const { page, limit } = pagination
        const breakdowns = this.collection.paginate(page, limit).toArray()
        const total = this.collection.count()
        return Result.SuccessPaginated(breakdowns, total, page, limit )
    }
    async store(vehicleBreakdown: VehicleBreakdown): Promise<VoidResult> {
        this.collection.add(vehicleBreakdown);
        return Result.SuccessVoid();
    }

    async getBreakdownByVehicle(vehicleImmatriculation: VehicleImmatriculation): Promise<OptionalResult<VehicleBreakdown>> {
        const vehicleBreakdown = this.collection.findOne('vehicleImmatriculation', vehicleImmatriculation);
        return vehicleBreakdown ? Result.Success(vehicleBreakdown) : Result.SuccessVoid();
    }
}