import { VehicleRepository } from '@application/maintenance/repositories//VehicleRepository';
import { Vehicle } from '@domain/maintenance/entities/Vehicle';
import { VehicleImmatriculation } from '@domain/maintenance/value-object/VehicleImmatriculation';
import { VehicleMapper } from '@infrastructure/common/entityMappers/VehicleMapper';
import {OptionalResult, PaginatedResult, Result, VoidResult} from '@shared/Result';
import { AbstractMongoRepository } from '../AbstractMongoRepository';
import {ApplicationException} from "@shared/ApplicationException";
import {PaginatedInput} from "@shared/PaginatedInput";
import {VehicleVin} from "@domain/maintenance/value-object/VehicleVin";

export class MongoVehicleRepository extends AbstractMongoRepository implements VehicleRepository {
    protected collectionName: string = "vehicles";

    store(vehicle: Vehicle): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().updateOne({ immatriculation: vehicle.immatriculation.getValue() }, { $set: VehicleMapper.toPersistence(vehicle) }, { upsert: true });
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session),
        )
    }

    delete(immatriculation: VehicleImmatriculation): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().deleteOne({ immatriculation: immatriculation.getValue() });
                await session.commitTransaction();
                return Result.SuccessVoid();
            }
        );
    }

    getByImmatriculation(immatriculation: VehicleImmatriculation): Promise<OptionalResult<Vehicle>> {
        return this.catchError(
            async () => {
                const vehicleDocument = await this.getCollection().findOne({ immatriculation: immatriculation.getValue() });
                if (!vehicleDocument) return Result.SuccessVoid();
                const vehicle = VehicleMapper.toDomain(vehicleDocument);
                if (vehicle instanceof ApplicationException) return Result.Failure(vehicle);
                return Result.Success<Vehicle>(vehicle);
            }
        )
    }

    getByVin(vin: VehicleVin): Promise<OptionalResult<Vehicle>> {
        return this.catchError(
            async () => {
                const vehicleDocument = await this.getCollection().findOne({ vin: vin.getValue() });
                if (!vehicleDocument) return Result.SuccessVoid();
                const vehicle = VehicleMapper.toDomain(vehicleDocument);
                if (vehicle instanceof ApplicationException) return Result.Failure(vehicle);
                return Result.Success<Vehicle>(vehicle);
            }
        )
    }

    async listVehicles(pagination: PaginatedInput): Promise<PaginatedResult<Vehicle>> {
        const { page, limit } = pagination;
        return this.catchError(
            async () => {
                const vehiclesDocuments = await this.getCollection().find().skip((page - 1) * limit).limit(limit);
                const vehiclesTotal = await this.getCollection().countDocuments();
                const vehicles = VehicleMapper.toDomainList(await vehiclesDocuments.toArray());
                return Result.SuccessPaginated<Vehicle>(vehicles, vehiclesTotal, page, limit);
            }
        )
    }

    getVehicleNeedForMaintenance(): Promise<Result<Vehicle[]>> {
        return this.catchError(
            async () => {
                const vehiclesDocuments = await this.getCollection().find({ maintenanceInterval: { $ne: null } }).toArray();
                const vehicles = VehicleMapper.toDomainList(vehiclesDocuments);
                return Result.Success<Vehicle[]>(vehicles.filter((vehicle) => vehicle.needMaintenance()));
            }
        )
    }
}