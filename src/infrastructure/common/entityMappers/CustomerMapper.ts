import { Customer, CustomerDTO } from "../../../domain/maintenance/entities/Customer";
import { MappedEntities, MappedEntity } from "./MappedEntity";
import {ApplicationException} from "@shared/ApplicationException";

export class CustomerMapper {
    public static toPersistence(customer: Customer): MappedEntity<CustomerDTO> {
        return new MappedEntity<CustomerDTO>({
            customerId: customer.customerId,
            name: customer.name,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
            address: customer.address,
            vehicleImmatriculations: customer.vehicleImmatriculations.map(vehicleImmatriculation => vehicleImmatriculation.getValue()),
        })
    }

    public static toDomain(customer: any): Customer | ApplicationException {
        return Customer.fromObject({
            customerId: customer.customerId,
            name: customer.name,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
            address: customer.address,
            vehicleImmatriculations : customer.vehicleImmatriculations
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