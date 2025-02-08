import {Dealer} from "@domain/inventoryManagement/entities/Dealer";
import {IRepository} from "@shared/IRepository";
import {OptionalResult, PaginatedResult, VoidResult} from "@shared/Result";
import { Siret } from '@domain/shared/value-object/Siret';
import {PaginatedInput} from "@shared/PaginatedInput";

export interface DealerRepository extends IRepository{
    list(pagination : PaginatedInput): Promise<PaginatedResult<Dealer>>
    getBySiret(siret: Siret): Promise<OptionalResult<Dealer>>
    store(dealer: Dealer): Promise<VoidResult>
    delete(siret: Siret): Promise<VoidResult>
}