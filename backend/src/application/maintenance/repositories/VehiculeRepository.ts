import { Vehicule } from "@domain/maintenance/entities/Vehicule"
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation"
import {OptionalResult, PaginatedResult, VoidResult} from "@shared/Result"
import {PaginatedInput} from "@shared/PaginatedInput";

export interface VehiculeRepository {
    store(vehicule: Vehicule): Promise<VoidResult>
    delete(immatriculation: VehiculeImmatriculation): Promise<VoidResult>
    getByImmatriculation(immatriculation: VehiculeImmatriculation): Promise<OptionalResult<Vehicule>>
}