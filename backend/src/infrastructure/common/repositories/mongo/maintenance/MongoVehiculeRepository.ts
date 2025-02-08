import { VehiculeRepository } from '@application/maintenance/repositories//VehiculeRepository';
import { Vehicule } from '@domain/maintenance/entities/Vehicule';
import { VehiculeImmatriculation } from '@domain/maintenance/value-object/VehiculeImmatriculation';
import { VehiculeMapper } from '@infrastructure/common/entityMappers/VehiculeMapper';
import {OptionalResult, PaginatedResult, Result, VoidResult} from '@shared/Result';
import { AbstractMongoRepository } from '../AbstractMongoRepository';
import {ApplicationException} from "@shared/ApplicationException";
import {PaginatedInput} from "@shared/PaginatedInput";
import {VehiculeVin} from "@domain/maintenance/value-object/VehiculeVin";

export class MongoVehiculeRepository extends AbstractMongoRepository implements VehiculeRepository {
    protected collectionName: string = "vehicules";

    store(vehicule: Vehicule): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().updateOne({ immatriculation: vehicule.immatriculation.getValue() }, { $set: VehiculeMapper.toPersistence(vehicule) }, { upsert: true });
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session),
        )
    }

    delete(immatriculation: VehiculeImmatriculation): Promise<VoidResult> {
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

    getByImmatriculation(immatriculation: VehiculeImmatriculation): Promise<OptionalResult<Vehicule>> {
        return this.catchError(
            async () => {
                const vehiculeDocument = await this.getCollection().findOne({ immatriculation: immatriculation.getValue() });
                if (!vehiculeDocument) return Result.SuccessVoid();
                const vehicule = VehiculeMapper.toDomain(vehiculeDocument);
                if (vehicule instanceof ApplicationException) return Result.Failure(vehicule);
                return Result.Success<Vehicule>(vehicule);
            }
        )
    }

    getByVin(vin: VehiculeVin): Promise<OptionalResult<Vehicule>> {
        return this.catchError(
            async () => {
                const vehiculeDocument = await this.getCollection().findOne({ vin: vin.getValue() });
                if (!vehiculeDocument) return Result.SuccessVoid();
                const vehicule = VehiculeMapper.toDomain(vehiculeDocument);
                if (vehicule instanceof ApplicationException) return Result.Failure(vehicule);
                return Result.Success<Vehicule>(vehicule);
            }
        )
    }

    async listVehicules(pagination: PaginatedInput): Promise<PaginatedResult<Vehicule>> {
        const { page, limit } = pagination;
        return this.catchError(
            async () => {
                const vehiculesDocuments = await this.getCollection().find().skip((page - 1) * limit).limit(limit);
                const vehiculesTotal = await this.getCollection().countDocuments();
                const vehicules = VehiculeMapper.toDomainList(await vehiculesDocuments.toArray());
                return Result.SuccessPaginated<Vehicule>(vehicules, vehiculesTotal, page, limit);
            }
        )
    }

    getVehiculeNeedForMaintenance(): Promise<Result<Vehicule[]>> {
        return this.catchError(
            async () => {
                const vehiculesDocuments = await this.getCollection().find({ maintenanceInterval: { $ne: null } }).toArray();
                const vehicules = VehiculeMapper.toDomainList(vehiculesDocuments);
                return Result.Success<Vehicule[]>(vehicules.filter((vehicule) => vehicule.needMaintenance()));
            }
        )
    }
}