import { GarageRepository } from "../../../../application/maintenance/GarageRepository";
import { Garage } from "../../../../domain/maintenance/entities/Garage";
import { GarageAddress } from "../../../../domain/maintenance/value-object/GarageAddress";
import { Siret } from "../../../../domain/shared/value-object/Siret";
import { Result, VoidResult } from "../../../../shared/Result";
import { AbstractKnexRepository } from "../AbstractKnexRepository";

export class KnexGarageRepository extends AbstractKnexRepository implements GarageRepository {
    protected tableName: string = "garages";
    private addressesTableName: string = "garages_addresses";

    async getBySiret(siret: Siret): Promise<Result<Garage>> {
        try {
            const garageRow = await this.getQuery().where('siret', siret.getValue).first() as any;

            if (!garageRow) {
                return Result.FailureStr("Garage not found");
            }

            const garageAddressRow = await this.getQuery(this.addressesTableName).where('id', garageRow.address_id).first() as any;
            if (!garageAddressRow) {
                return Result.FailureStr("Dealer address not found");
            }
            const garageAddress = new GarageAddress(
                garageAddressRow.street,
                garageAddressRow.city,
                garageAddressRow.postalCode,
                garageAddressRow.country
            );

            const garage = new Garage(
                garageRow.siret,
                garageRow.name,
                garageRow.phoneNumber,
                garageAddress,
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
            const addressId = await transaction.insert({
                street: garage.address.street,
                city: garage.address.city,
                postalCode: garage.address.postalCode,
                country: garage.address.country
            }).into(this.addressesTableName);

            await transaction.insert({
                siret: garage.siret.getValue(),
                name: garage.name,
                address_id: addressId,
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