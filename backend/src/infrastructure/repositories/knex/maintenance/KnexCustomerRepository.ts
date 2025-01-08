import { CustomerRepository } from "../../../../application/maintenance/repositories/CustomerRepository";
import { Customer } from "../../../../domain/maintenance/entities/Customer";
import { CustomerAddress } from "../../../../domain/maintenance/value-object/CustomerAddress";
import { VehicleImmatriculation } from "../../../../domain/shared/value-object/VehicleImmatriculation";
import { Result, VoidResult } from "../../../../shared/Result";
import { CustomerMapper } from "../../../entityMappers/CustomerMapper";
import { AbstractKnexRepository } from "../AbstractKnexRepository";

export class KnexCustomerRepository extends AbstractKnexRepository implements CustomerRepository {
    protected tableName: string = "customers";
    private vehiclesTableName: string = "vehicles";
    private addressesTableName: string = "customers_addresses";

    async find(vehiculeImmatriculation: VehicleImmatriculation): Promise<Result<Customer>> {
        try {
            const customerRow = await this.getQuery().where('immatriculation', vehiculeImmatriculation).first() as any;

            if (!customerRow) return Result.FailureStr("Customer not found");

            const customerAddressRow = await this.getQuery(this.addressesTableName).where('id', customerRow.address_id).first() as any;
            if (!customerAddressRow) return Result.FailureStr("Customer address not found");

            const customerAddress = new CustomerAddress(
                customerAddressRow.street,
                customerAddressRow.city,
                customerAddressRow.postalCode,
                customerAddressRow.country
            );

            const customer = new Customer(
                customerRow.id,
                customerRow.name,
                customerRow.email,
                customerRow.phone,
                vehiculeImmatriculation,
                customerRow.address,
            );

            return Result.Success<Customer>(CustomerMapper.toDomain(customer));
        } catch (e) {
            console.error(e);
            return Result.FailureStr("An error occurred while getting customer");
        }
    }

    async store(customer: Customer): Promise<Result<Customer>> {
        const transaction = await this.connection.transaction();

        try {
            await transaction.insert(
                CustomerMapper.toPersistence(customer)
            ).into(this.tableName);
            await transaction.insert({
                immatriculation: customer.vehiculeImmatrictulation,
                customer_id: customer.id,
            }).into(this.vehiclesTableName);

            await transaction.commit();
            return Result.Success<Customer>(customer);
        } catch (e) {
            await transaction.rollback();
            console.error(e)
            return Result.FailureStr("An error occurred while storing customer");
        }
    }

    async update(customer: Customer): Promise<VoidResult> {
        const transaction = await this.connection.transaction();

        try {
            await transaction(this.tableName).where('id', customer.id).update({
                name: customer.name,
                email: customer.email,
                phone: customer.phoneNumber,
            });

            await transaction(this.vehiclesTableName).where('customer_id', customer.id).update({
                immatriculation: customer.vehiculeImmatrictulation,
            });

            await transaction.commit();
            return Result.SuccessVoid();
        } catch (e) {
            await transaction.rollback();
            console.error(e)
            return Result.FailureStr("An error occurred while updating customer");
        }
    }

    async delete(customer: Customer): Promise<VoidResult> {
        const transaction = await this.connection.transaction();

        try {
            await transaction.delete().from(this.tableName).where('id', customer.id);
            await transaction.delete().from(this.vehiclesTableName).where('customer_id', customer.id);
            return Result.SuccessVoid();
        } catch (e) {
            await transaction.rollback();
            console.error(e)
            return Result.FailureStr("An error occurred while deleting customer");
        }
    }
}   