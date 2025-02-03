import { EventRepository } from "@application/shared/repositories/EventRepository";
import { Customer } from "@domain/maintenance/entities/Customer";
import { Address } from "@domain/shared/value-object/Address";
import { ApplicationException } from "@shared/ApplicationException";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { CustomerRepository } from '../../repositories/CustomerRepository';

interface RegisterCustomerInput extends IInputUseCase {
    customerId: string,
    name: string,
    phoneNumber: string,
    email: string
    address: Address
}

export type RegisterCustomerUseCase = IUseCase<RegisterCustomerInput, Result>
export const createRegisterCustomerUseCase = (_eventRepository: EventRepository, _customerRepository: CustomerRepository): RegisterCustomerUseCase => {
    return async (input: RegisterCustomerInput) => {
        const existingCustomerResponse = await _customerRepository.find(input.customerId);
        if (!existingCustomerResponse.success) return existingCustomerResponse
        if (!existingCustomerResponse.empty) return Result.FailureStr("Customer already exists with this customerId")

        const customer = Customer.create({
            customerId: Customer.generateID(),
            name: input.name,
            phoneNumber: input.phoneNumber,
            email: input.email,
            address: input.address
        })

        if (customer instanceof ApplicationException) return Result.Failure(customer)
        const storeResponse = await _eventRepository.storeEvent(customer.registerEvent());
        if (!storeResponse.success) return Result.FailureStr("Cannot register customer")
        return Result.Success("Customer registered")
    }
}