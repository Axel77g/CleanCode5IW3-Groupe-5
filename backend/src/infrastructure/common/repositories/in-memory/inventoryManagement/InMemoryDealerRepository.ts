import {AbstractInMemoryRepository} from "@infrastructure/common/repositories/in-memory/AbstractInMemoryRepository";
import {Dealer} from "@domain/inventoryManagement/entities/Dealer";
import {DealerRepository} from "@application/inventoryManagement/repositories/DealerRepository";
import { Siret } from "@domain/shared/value-object/Siret";
import { PaginatedInput } from "@shared/PaginatedInput";
import {PaginatedResult, OptionalResult, VoidResult, Result} from "@shared/Result";

export class InMemoryDealerRepository extends AbstractInMemoryRepository<Dealer> implements DealerRepository {
    async list(pagination: PaginatedInput): Promise<PaginatedResult<Dealer>> {
        const {page, limit} = pagination;
        const dealers= this.collection.paginate(page, limit).toArray();
        const total = this.collection.count();
        return Promise.resolve(Result.SuccessPaginated(dealers, total, page, limit));

    }
    async getBySiret(siret: Siret): Promise<OptionalResult<Dealer>> {
        const dealer = this.collection.findOne('siret', siret);
        return dealer ? Result.Success(dealer) : Result.SuccessVoid();
    }
    async store(dealer: Dealer): Promise<VoidResult> {
        this.collection.add(dealer);
        return Result.SuccessVoid();
    }
    async delete(siret: Siret): Promise<VoidResult> {
        this.collection.remove('siret', siret);
        return Result.SuccessVoid();
    }
}