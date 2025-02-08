import { Vehicule } from "@domain/maintenance/entities/Vehicule"
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation"
import {OptionalResult, PaginatedResult, Result, VoidResult} from "@shared/Result"
import {PaginatedInput} from "@shared/PaginatedInput";
import {IRepository} from "@shared/IRepository";
import {VehiculeVin} from "@domain/maintenance/value-object/VehiculeVin";

export interface VehiculeRepository extends IRepository{
    getByVin(vin: VehiculeVin): Promise<OptionalResult<Vehicule>>;
    listVehicules(pagination: PaginatedInput): Promise<PaginatedResult<Vehicule>>;
    store(vehicule: Vehicule): Promise<VoidResult>
    delete(immatriculation: VehiculeImmatriculation): Promise<VoidResult>
    getByImmatriculation(immatriculation: VehiculeImmatriculation): Promise<OptionalResult<Vehicule>>
    getVehiculeNeedForMaintenance(): Promise<Result<Vehicule[]>>;
}