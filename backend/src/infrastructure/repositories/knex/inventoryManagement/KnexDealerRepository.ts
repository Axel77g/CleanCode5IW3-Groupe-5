import {AbstractKnexRepository} from "../AbstractKnexRepository";
import {DealerRepository} from "../../../../application/inventoryManagement/repositories/DealerRepository";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";
import {AbstractRepositoryResponse} from "../../../../shared/IRepository";
import {Dealer} from "../../../../domain/inventoryManagement/entities/Dealer";
import {KnexRepositoryResponse} from "../KnexRepositoryResponse";
import {DealerAddress} from "../../../../domain/inventoryManagement/value-object/DealerAddress";

export class KnexDealerRepository extends AbstractKnexRepository implements DealerRepository{
    protected tableName: string = "dealers";
    private addressesTableName: string = "dealers_addresses";

    async getBySiret(siret: DealerSiret): Promise<AbstractRepositoryResponse<Dealer>> {
        try{
            const dealerRow = await this.getQuery().where('siret', siret.getValue).first() as any;
            if(!dealerRow) {
                return new KnexRepositoryResponse<Dealer>();
            }
            const dealerAddressRow = await this.getQuery(this.addressesTableName).where('id', dealerRow.address_id).first() as any;
            if(!dealerAddressRow) {
                return new KnexRepositoryResponse<Dealer>();
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

            return new KnexRepositoryResponse<Dealer>(dealer);
        }catch (e){
            return new KnexRepositoryResponse<Dealer>(undefined, true);
        }
    }



    async store(dealer: Dealer): Promise<AbstractRepositoryResponse<void>> {
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
            return new KnexRepositoryResponse<void>();
        }catch (e){
            await transaction.rollback();
            return new KnexRepositoryResponse<void>(undefined, true);
        }
    }

    async delete(siret: DealerSiret): Promise<AbstractRepositoryResponse<void>> {
        const transaction = await this.connection.transaction();
        try{
            await transaction.delete().from(this.tableName).where('siret', siret.getValue());
            await transaction.commit();
            return new KnexRepositoryResponse<void>();
        }catch (e){
            await transaction.rollback();
            return new KnexRepositoryResponse<void>(undefined, true);
        }
    }
}