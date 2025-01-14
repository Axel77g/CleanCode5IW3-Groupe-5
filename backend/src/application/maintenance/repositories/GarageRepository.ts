import { Garage } from '../../../domain/maintenance/entities/Garage';
import { Siret } from '../../../domain/shared/value-object/Siret';
import { IRepository } from '../../../shared/IRepository';
import { Result, VoidResult } from '../../../shared/Result';

export interface GarageRepository extends IRepository {
    show(siret: Siret): Promise<Result<Garage>>
    store(garage: Garage): Promise<VoidResult>;
    delete(siret: Siret): Promise<VoidResult>;
}
