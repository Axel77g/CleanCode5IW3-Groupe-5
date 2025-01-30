import { PaginatedInput } from '@shared/PaginatedInput';
import { Garage } from '../../../domain/maintenance/entities/Garage';
import { Siret } from '../../../domain/shared/value-object/Siret';
import { IRepository } from '../../../shared/IRepository';
import { OptionalResult, PaginatedResult, Result, VoidResult } from '../../../shared/Result';

export interface GarageRepository extends IRepository {
    list(pagination: PaginatedInput): Promise<PaginatedResult<Garage>>;
    getBySiret(siret: Siret): Promise<OptionalResult<Garage>>;
    show(siret: Siret): Promise<Result<Garage>>
    store(garage: Garage): Promise<VoidResult>;
    delete(siret: Siret): Promise<VoidResult>;
}
