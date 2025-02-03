import {AbstractInMemoryRepository} from "@infrastructure/common/repositories/in-memory/AbstractInMemoryRepository";
import {VehiculeBreakdown} from "@domain/maintenance/entities/VehiculeBreakdown";
import {VehiculeBreakdownRepository} from "@application/maintenance/repositories/VehiculeBreakdownRepository";
import {Vehicule} from "@domain/maintenance/entities/Vehicule";
import {OptionalResult, Result, VoidResult} from "@shared/Result";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";

export class InMemoryVehiculeBreakdownRepository extends AbstractInMemoryRepository<VehiculeBreakdown> implements VehiculeBreakdownRepository {
    async store(vehiculeBreakdown: VehiculeBreakdown): Promise<VoidResult> {
        this.collection.add(vehiculeBreakdown);
        return Result.SuccessVoid();
    }

    async getBreakdownByVehicule(vehiculeImmatriculation: VehiculeImmatriculation): Promise<OptionalResult<VehiculeBreakdown>> {
        const vehiculeBreakdown = this.collection.findOne('vehiculeImmatriculation', vehiculeImmatriculation);
        return vehiculeBreakdown ? Result.Success(vehiculeBreakdown) : Result.SuccessVoid();
    }
}