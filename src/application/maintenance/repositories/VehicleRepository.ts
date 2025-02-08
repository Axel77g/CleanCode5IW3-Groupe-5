import { Vehicle } from "@domain/maintenance/entities/Vehicle"
import { VehicleImmatriculation } from "@domain/maintenance/value-object/VehicleImmatriculation"
import {OptionalResult, PaginatedResult, Result, VoidResult} from "@shared/Result"
import {PaginatedInput} from "@shared/PaginatedInput";
import {IRepository} from "@shared/IRepository";
import {VehicleVin} from "@domain/maintenance/value-object/VehicleVin";

export interface VehicleRepository extends IRepository{
    getByVin(vin: VehicleVin): Promise<OptionalResult<Vehicle>>;
    listVehicles(pagination: PaginatedInput): Promise<PaginatedResult<Vehicle>>;
    store(vehicle: Vehicle): Promise<VoidResult>
    delete(immatriculation: VehicleImmatriculation): Promise<VoidResult>
    getByImmatriculation(immatriculation: VehicleImmatriculation): Promise<OptionalResult<Vehicle>>
    getVehicleNeedForMaintenance(): Promise<Result<Vehicle[]>>;
}