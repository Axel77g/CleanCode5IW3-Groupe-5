import { Customer } from "../../domain/maintenance/entities/Customer";
import { CustomerAddress } from "../../domain/maintenance/value-object/CustomerAddress";
import { VehicleImmatriculation } from "../../domain/shared/value-object/VehicleImmatriculation";
import { MappedEntity } from "./MappedEntity";

export class CustomerMapper {
    public static toPersistence(customer: Customer): MappedEntity {
        return new MappedEntity({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone_number: customer.phoneNumber,
            address: customer.address,
        })
    }

    public static toDomain(customer: any) {
        return new Customer(
            customer.id,
            customer.name,
            customer.phone_number,
            customer.email,
            new VehicleImmatriculation(customer.immatriculation),
            new CustomerAddress(
                customer.address.street,
                customer.address.city,
                customer.address.postalCode,
                customer.address.country
            )
        )
    }

    public static toPersistenceList(customers: Customer[]): MappedEntity[] {
        return customers.map(customer => {
            return CustomerMapper.toPersistence(customer);
        })
    }

    public static toDomainList(customers: any[]) {
        return customers.map(customer => {
            return CustomerMapper.toDomain(customer);
        })
    }
}