import { DealerRepository } from "../../../../../application/inventoryManagement/repositories/DealerRepository";
import { Dealer } from "../../../../../domain/inventoryManagement/entities/Dealer";
import { Siret } from "../../../../../domain/shared/value-object/Siret";
import { Result, VoidResult } from "../../../../../shared/Result";
import { AbstractKnexRepository } from "../AbstractKnexRepository";
import {DealerMapper} from "../../../entityMappers/DealerMapper";

export class KnexDealerRepository extends AbstractKnexRepository implements DealerRepository {
    protected tableName: string = "dealers";

    async getBySiret(siret: Siret): Promise<Result<Dealer>> {
        try {
            const dealerRow = await this.getQuery().where('siret', siret.getValue).first() as any;
            if (!dealerRow) {
                return Result.FailureStr("Dealer not found");
            }
            return Result.Success<Dealer>(DealerMapper.toDomain(dealerRow));
        } catch (e) {
            console.error(e);
            return Result.FailureStr("An error occurred while getting dealer");
        }
    }

    async store(dealer: Dealer): Promise<VoidResult> {
        const transaction = await this.connection.transaction();
        try {
            await transaction.insert(
                DealerMapper.toPersistence(dealer)
            ).into(this.tableName);
            await transaction.commit();
            return Result.SuccessVoid();
        } catch (e) {
            await transaction.rollback();
            console.error(e);
            return Result.FailureStr("An error occurred while storing dealer");
        }
    }

    async delete(siret: Siret): Promise<VoidResult> {
        const transaction = await this.connection.transaction();
        try {
            await transaction.delete().from(this.tableName).where('siret', siret.getValue());
            await transaction.commit();
            return Result.SuccessVoid();
        } catch (e) {
            await transaction.rollback();
            console.error(e);
            return Result.FailureStr("An error occurred while deleting dealer");
        }
    }
}