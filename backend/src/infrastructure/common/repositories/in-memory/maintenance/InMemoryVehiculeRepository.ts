import { VehiculeRepository } from "@application/maintenance/repositories/VehiculeRepository";
import { Vehicule } from "@domain/maintenance/entities/Vehicule";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import { OptionalResult, Result, VoidResult } from "@shared/Result";
import { AbstractInMemoryRepository } from "../AbstractInMemoryRepository";


export class InMemoryVehiculeRepository extends AbstractInMemoryRepository<Vehicule> implements VehiculeRepository {

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
}