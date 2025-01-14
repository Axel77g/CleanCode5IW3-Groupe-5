import { Customer, CustomerDTO } from "../../../domain/maintenance/entities/Customer";
import { MappedEntities, MappedEntity } from "./MappedEntity";

export class CustomerMapper {
    public static toPersistence(customer: Customer): MappedEntity<CustomerDTO> {
        return new MappedEntity<CustomerDTO>({
            customerId: customer.customerId,
            name: customer.name,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
            address: customer.address,
        })
    }

    public static toDomain(customer: any): Customer | Error {
        return Customer.fromObject({
            customerId: customer.customerId,
            name: customer.name,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
            address: customer.address
        })
    }

    public static toPersistenceList(customers: Customer[]): MappedEntity<CustomerDTO>[] {
        return new MappedEntities(customers.map(customer => {
            return CustomerMapper.toPersistence(customer);
        }))
    }

    public static toDomainList(customers: any[]): Customer[] {
        return customers.map(customer => {
            return CustomerMapper.toDomain(customer);
        }).filter(customer => !(customer instanceof Error)) as Customer[];
    }
}