import { EventRepository } from "@application/shared/repositories/EventRepository";
import { RegisterCustomerEvent } from "@domain/maintenance/events/RegisterCustomerEvent";
import { randomUUID } from "crypto";
import { CustomerAddress } from "@domain/maintenance/value-object/CustomerAddress";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";

interface RegisterCustomerInput extends IInputUseCase {
    name: string,
    phoneNumber: string,
    email: string
    address: CustomerAddress
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