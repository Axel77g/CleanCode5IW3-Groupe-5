import { EventRepository } from "@application/shared/repositories/EventRepository";
import { Customer } from "@domain/maintenance/entities/Customer";
import { Address } from "@domain/shared/value-object/Address";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { CustomerRepository } from '../../repositories/CustomerRepository';
import {ApplicationException} from "@shared/ApplicationException";

interface RegisterCustomerInput extends IInputUseCase {
    customerId: string,
    name: string,
    phoneNumber: string,
    email: string
    address: Address
}

export type RegisterCustomerUseCase = IUseCase<RegisterCustomerInput, Result>

const registerCustomerErrors = {
    CANNOT_REGISTER_CUSTOMER: new ApplicationException("RegisterCustomer.CannotRegisterCustomer", "Cannot register customer"),
    CUSTOMER_ALREADY_REGISTERED: new ApplicationException("RegisterCustomer.CustomerAlreadyRegistered", "Customer already registered")
}

export const createRegisterCustomerUseCase = (_eventRepository: EventRepository, customerRepository: CustomerRepository): RegisterCustomerUseCase => {
    return async (input: RegisterCustomerInput) => {
        const existingCustomerResponse = await customerRepository.find(input.customerId)
        if(!existingCustomerResponse.success) return existingCustomerResponse
        if(!existingCustomerResponse.empty) return Result.Failure(registerCustomerErrors.CUSTOMER_ALREADY_REGISTERED)
        const customer = Customer.create({
            customerId: input.customerId,
            name: input.name,
            phoneNumber: input.phoneNumber,
            email: input.email,
            address: input.address,
            vehicleImmatriculations: []
        })
        if(customer instanceof ApplicationException) return Result.Failure(customer)
        const storeResponse = await _eventRepository.storeEvent(customer.registerEvent());
        if(!storeResponse.success) return Result.Failure(registerCustomerErrors.CANNOT_REGISTER_CUSTOMER)
        return Result.Success("customer registered")
    }
}