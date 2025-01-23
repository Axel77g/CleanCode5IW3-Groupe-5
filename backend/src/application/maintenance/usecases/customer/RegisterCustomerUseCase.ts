import { EventRepository } from "@application/shared/repositories/EventRepository";
import { RegisterCustomerEvent } from "@domain/maintenance/events/customer/RegisterCustomerEvent";
import { Address } from "@domain/shared/value-object/Address";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { randomUUID } from "crypto";

interface RegisterCustomerInput extends IInputUseCase {
    name: string,
    phoneNumber: string,
    email: string
    address: Address
}

export type RegisterCustomerUseCase = IUseCase<RegisterCustomerInput, Result>
export const createRegisterCustomerUseCase = (_eventRepository: EventRepository): RegisterCustomerUseCase => {
    return async (input: RegisterCustomerInput) => {
        const registerCustomerEvent = new RegisterCustomerEvent({
            customerId: randomUUID(),
            name: input.name,
            phoneNumber: input.phoneNumber,
            email: input.email,
            address: input.address
        })
        const storeResponse = await _eventRepository.storeEvent(registerCustomerEvent);
        if (!storeResponse.success) return Result.FailureStr("Cannot register customer")
        return Result.Success("Customer registered")
    }
}