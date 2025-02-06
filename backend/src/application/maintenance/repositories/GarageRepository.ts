import {IRepository} from "@shared/IRepository";
import {PaginatedInput} from "@shared/PaginatedInput";
import {OptionalResult, PaginatedResult, VoidResult} from "@shared/Result";
import {Garage} from "@domain/maintenance/entities/Garage";
import {Siret} from "@domain/shared/value-object/Siret";

export interface GarageRepository extends IRepository {
    listGarages(pagination: PaginatedInput): Promise<PaginatedResult<Garage>>
    getBySiret(siret: Siret): Promise<OptionalResult<Garage>>
    store(garage: Garage): Promise<VoidResult>
    deleteGarage(siret: Siret): Promise<VoidResult>
}