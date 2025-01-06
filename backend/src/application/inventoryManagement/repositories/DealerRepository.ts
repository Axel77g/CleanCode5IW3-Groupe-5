import {Dealer} from "../../../domain/inventoryManagement/entities/Dealer";
import {IRepository} from "../../../shared/IRepository";
import {Result, VoidResult} from "../../../shared/Result";
import { Siret } from '../../../domain/shared/value-object/Siret';

export interface DealerRepository extends IRepository{
    getBySiret(siret: Siret): Promise<Result<Dealer>>
    store(dealer: Dealer): Promise<VoidResult>
    delete(siret: Siret): Promise<VoidResult>
}