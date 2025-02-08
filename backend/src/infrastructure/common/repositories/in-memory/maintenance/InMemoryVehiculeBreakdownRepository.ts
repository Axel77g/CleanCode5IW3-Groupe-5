import {AbstractInMemoryRepository} from "@infrastructure/common/repositories/in-memory/AbstractInMemoryRepository";
import {VehiculeBreakdown} from "@domain/maintenance/entities/VehiculeBreakdown";
import {VehiculeBreakdownRepository} from "@application/maintenance/repositories/VehiculeBreakdownRepository";
import {OptionalResult, PaginatedResult, Result, VoidResult} from "@shared/Result";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {PaginatedInput} from "@shared/PaginatedInput";

export class InMemoryVehiculeBreakdownRepository extends AbstractInMemoryRepository<VehiculeBreakdown> implements VehiculeBreakdownRepository {
    async getBreakdownById(vehiculeBreakdownId: string): Promise<OptionalResult<VehiculeBreakdown>> {
        const vehiculeBreakdown = this.collection.findOne('vehiculeBreakdownId', vehiculeBreakdownId);
        return vehiculeBreakdown ? Result.Success(vehiculeBreakdown) : Result.SuccessVoid();
    }
    async listVehiculeBreakdowns(vehiculeImmatriculation: VehiculeImmatriculation, pagination: PaginatedInput): Promise<PaginatedResult<VehiculeBreakdown>> {
        const { page, limit } = pagination
        const breakdowns = this.collection.paginate(page, limit).toArray()
        const total = this.collection.count()
        return Result.SuccessPaginated(breakdowns, total, page, limit )
    }
    async store(vehiculeBreakdown: VehiculeBreakdown): Promise<VoidResult> {
        this.collection.add(vehiculeBreakdown);
        return Result.SuccessVoid();
    }

    async getBreakdownByVehicule(vehiculeImmatriculation: VehiculeImmatriculation): Promise<OptionalResult<VehiculeBreakdown>> {
        const vehiculeBreakdown = this.collection.findOne('vehiculeImmatriculation', vehiculeImmatriculation);
        return vehiculeBreakdown ? Result.Success(vehiculeBreakdown) : Result.SuccessVoid();
    }
}