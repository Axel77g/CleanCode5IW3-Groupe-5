import { VehiculeRepository } from "@application/maintenance/repositories/VehiculeRepository";
import { Vehicule } from "@domain/maintenance/entities/Vehicule";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {OptionalResult, PaginatedResult, Result, VoidResult} from "@shared/Result";
import { AbstractInMemoryRepository } from "../AbstractInMemoryRepository";
import {PaginatedInput} from "@shared/PaginatedInput";


export class InMemoryVehiculeRepository extends AbstractInMemoryRepository<Vehicule> implements VehiculeRepository {
    async getVehiculeNeedForMaintenance(): Promise<Result<Vehicule[]>> {
        const vehicles = this.collection.toArray()
        const filteredVehicles = vehicles.filter(vehicule => vehicule.needMaintenance())
        return Result.Success(filteredVehicles);
    }

    async store(vehicule: Vehicule): Promise<VoidResult> {
        this.collection.add(vehicule);
        return Result.SuccessVoid();
    }

    async delete(immatriculation: VehiculeImmatriculation): Promise<VoidResult> {
        this.collection.remove('immatriculation', immatriculation);
        return Result.SuccessVoid();
    }

    async getByImmatriculation(immatriculation: VehiculeImmatriculation): Promise<OptionalResult<Vehicule>> {
        const vehicule = this.collection.findOne('immatriculation', immatriculation);
        return vehicule ? Result.Success(vehicule) : Result.SuccessVoid();
    }

    listVehicules(pagination: PaginatedInput): Promise<PaginatedResult<Vehicule>> {
        const { page, limit } = pagination
        const vehicules = this.collection.paginate(page, limit).toArray()
        const total = this.collection.count()
        return Promise.resolve(Result.SuccessPaginated(vehicules, total, page, limit))
    }
}