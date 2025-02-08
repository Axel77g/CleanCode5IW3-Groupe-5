import { VehicleRepository } from "@application/maintenance/repositories/VehicleRepository";
import { Vehicle } from "@domain/maintenance/entities/Vehicle";
import { VehicleImmatriculation } from "@domain/maintenance/value-object/VehicleImmatriculation";
import {OptionalResult, PaginatedResult, Result, VoidResult} from "@shared/Result";
import { AbstractInMemoryRepository } from "../AbstractInMemoryRepository";
import {PaginatedInput} from "@shared/PaginatedInput";
import { VehicleVin } from "@domain/maintenance/value-object/VehicleVin";


export class InMemoryVehicleRepository extends AbstractInMemoryRepository<Vehicle> implements VehicleRepository {

    async getVehicleNeedForMaintenance(): Promise<Result<Vehicle[]>> {
        const vehicles = this.collection.toArray()
        const filteredVehicles = vehicles.filter(vehicle => vehicle.needMaintenance())
        return Result.Success(filteredVehicles);
    }

    async store(vehicle: Vehicle): Promise<VoidResult> {
        this.collection.add(vehicle);
        return Result.SuccessVoid();
    }

    async delete(immatriculation: VehicleImmatriculation): Promise<VoidResult> {
        this.collection.remove('immatriculation', immatriculation);
        return Result.SuccessVoid();
    }

    async getByImmatriculation(immatriculation: VehicleImmatriculation): Promise<OptionalResult<Vehicle>> {
        const vehicle = this.collection.findOne('immatriculation', immatriculation);
        return vehicle ? Result.Success(vehicle) : Result.SuccessVoid();
    }

    async getByVin(vin: VehicleVin): Promise<OptionalResult<Vehicle>> {
        const vehicle = this.collection.findOne('vin', vin);
        return vehicle ? Result.Success(vehicle) : Result.SuccessVoid();
    }

    listVehicles(pagination: PaginatedInput): Promise<PaginatedResult<Vehicle>> {
        const { page, limit } = pagination
        const vehicles = this.collection.paginate(page, limit).toArray()
        const total = this.collection.count()
        return Promise.resolve(Result.SuccessPaginated(vehicles, total, page, limit))
    }
}