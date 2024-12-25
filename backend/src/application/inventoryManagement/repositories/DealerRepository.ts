import {Dealer} from "../../../domain/inventoryManagement/entities/Dealer";
import {DealerSiret} from "../../../domain/inventoryManagement/value-object/DealerSiret";
import {IRepository} from "../../../shared/IRepository";
import {Result, VoidResult} from "../../../shared/Result";

export interface DealerRepository extends IRepository{
    getBySiret(siret: DealerSiret): Promise<Result<Dealer>>
    store(dealer: Dealer): Promise<VoidResult>
    delete(siret: DealerSiret): Promise<VoidResult>
}