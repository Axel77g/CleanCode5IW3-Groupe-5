import {Dealer} from "../../../domain/inventoryManagement/entities/Dealer";
import {DealerSiret} from "../../../domain/inventoryManagement/value-object/DealerSiret";
import {IRepository, AbstractRepositoryResponse} from "../../../shared/IRepository";

export interface DealerRepository extends IRepository{
    getBySiret(siret: DealerSiret): Promise<AbstractRepositoryResponse<Dealer>>
    store(dealer: Dealer): Promise<AbstractRepositoryResponse<void>>
    delete(siret: DealerSiret): Promise<AbstractRepositoryResponse<void>>
}