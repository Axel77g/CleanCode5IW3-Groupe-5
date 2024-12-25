import {AbstractKnexRepository} from "../AbstractKnexRepository";
import {DealerRepository} from "../../../../application/inventoryManagement/repositories/DealerRepository";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";
import {Dealer} from "../../../../domain/inventoryManagement/entities/Dealer";
import {DealerAddress} from "../../../../domain/inventoryManagement/value-object/DealerAddress";
import {Result, VoidResult} from "../../../../shared/Result";

export class KnexDealerRepository extends AbstractKnexRepository implements DealerRepository{
    protected tableName: string = "dealers";
    private addressesTableName: string = "dealers_addresses";

    async getBySiret(siret: DealerSiret): Promise<Result<Dealer>> {
        try{
            const dealerRow = await this.getQuery().where('siret', siret.getValue).first() as any;
            if(!dealerRow) {
                return Result.FailureStr("Dealer not found");
            }
            const dealerAddressRow = await this.getQuery(this.addressesTableName).where('id', dealerRow.address_id).first() as any;
            if(!dealerAddressRow) {
                return Result.FailureStr("Dealer address not found");
            }
            const dealerAddress = new DealerAddress(
                dealerAddressRow.street,
                dealerAddressRow.city,
                dealerAddressRow.postalCode,
                dealerAddressRow.country
            );
            const dealer = new Dealer(
                dealerRow.siret,
                dealerRow.name,
                dealerAddress,
                dealerRow.phoneNumber
            );

            return Result.Success<Dealer>(dealer);
        }catch (e){
            console.error(e);
            return Result.FailureStr("An error occurred while getting dealer");
        }
    }



    async store(dealer: Dealer): Promise<VoidResult> {
        const transaction = await this.connection.transaction();
        try{
            const addressId = await transaction.insert({
                street: dealer.address.street,
                city: dealer.address.city,
                postalCode: dealer.address.postalCode,
                country: dealer.address.country
            }).into(this.addressesTableName);

            await transaction.insert({
                siret: dealer.siret.getValue(),
                name: dealer.name,
                address_id: addressId,
                phoneNumber: dealer.phoneNumber
            }).into(this.tableName);

            await transaction.commit();
            return Result.SuccessVoid();
        }catch (e){
            await transaction.rollback();
            console.error(e);
            return Result.FailureStr("An error occurred while storing dealer");
        }
    }

    async delete(siret: DealerSiret): Promise<VoidResult> {
        const transaction = await this.connection.transaction();
        try{
            await transaction.delete().from(this.tableName).where('siret', siret.getValue());
            await transaction.commit();
            return Result.SuccessVoid();
        }catch (e){
            await transaction.rollback();
            console.error(e);
            return Result.FailureStr("An error occurred while deleting dealer");
        }
    }
}