import { GarageRepository } from "../../../../application/inventoryManagement/repositories/GarageRepository";
import { Garage } from "../../../../domain/inventoryManagement/entities/Garage";
import { Siret } from "../../../../domain/shared/value-object/Siret";
import { Result, VoidResult } from "../../../../shared/Result";
import { AbstractKnexRepository } from "../AbstractKnexRepository";

export class KnexGarageRepository extends AbstractKnexRepository implements GarageRepository {
    protected tableName: string = "garages";
    private addressesTableName: string = "garages_addresses";

    async getBySiret(siret: Siret): Promise<Result<Garage>> {
        try {
            const garageRow = await this.getQuery().where('siret', siret.getValue).first() as any;

            // @TODO: Check if the garage is alone or from a Dealer
            if (!garageRow) {
                return Result.FailureStr("Garage not found");
            }

            const dealerGarageRow = await this.getQuery(this.addressesTableName).where('id', garageRow.address_id).first() as any;
            if (!dealerGarageRow) {
                return Result.FailureStr("Garage address not found");
            }

            const garage = new Garage(
                garageRow.siret,
                garageRow.name,
                // garageAddress,
                garageRow.phoneNumber
            );

            return Result.Success<Garage>(garage);
        } catch (e) {
            console.error(e);
            return Result.FailureStr("An error occurred while getting garage");
        }
    }

    async store(garage: Garage): Promise<VoidResult> {
        const transaction = await this.connection.transaction();

        try {
            // @TODO: See how to handle garage address (same of the Dealer ?)

            await transaction.insert({
                siret: garage.siret.getValue(),
                name: garage.name,
                // address_id: addressId,
                phoneNumber: garage.phoneNumber
            }).into(this.tableName);

            await transaction.commit();
            return Result.SuccessVoid();
        } catch (e) {
            await transaction.rollback();
            console.error(e);
            return Result.FailureStr("An error occurred while storing garage");
        }
    }

    async delete(siret: Siret): Promise<VoidResult> {
        const transaction = await this.connection.transaction();
        try {
            await transaction.delete().from(this.addressesTableName).where('siret', siret.getValue());
            await transaction.commit();
            return Result.SuccessVoid();
        } catch (e) {
            await transaction.rollback();
            console.error(e);
            return Result.FailureStr("An error occurred while deleting garage");
        }
    }
}