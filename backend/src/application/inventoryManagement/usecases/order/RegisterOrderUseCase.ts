import { InventorySparePartRepository } from "@application/inventoryManagement/repositories/InventorySparePartRepository";
import { Order } from "@domain/inventoryManagement/entities/Order";
import { RegisterOrderEvent } from "@domain/inventoryManagement/events/RegisterOrderEvent";
import { OrderLine } from "@domain/inventoryManagement/value-object/OrderLine";
import { Siret } from '@domain/shared/value-object/Siret';
import { ApplicationException } from "@shared/ApplicationException";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { EventRepository } from "../../../shared/repositories/EventRepository";
import { DealerRepository } from "../../repositories/DealerRepository";

interface RegisterOrderInput extends IInputUseCase {
    dealer: Siret,
    deliveryDate: Date,
    orderedDate: Date,
    orderLines: OrderLine[]
}
export type RegisterOrderUseCase = IUseCase<RegisterOrderInput, Result>

const registerOrderErrors = {
    NOT_FOUND_DEALER: new ApplicationException("RegisterOrderUseCase.NotFoundDealer", "Cannot create order for not found dealer"),
    CANNOT_CREATE_ORDER_WITH_NOT_FOUND_REFERENCE: new ApplicationException("RegisterOrderUseCase.CannotCreateOrderWithNotFoundReference", "Cannot create order with not found reference")
}

export const createRegisterOrderUseCase = (_eventRepository: EventRepository, _dealerRepository: DealerRepository, _inventorySparePartRepository: InventorySparePartRepository): RegisterOrderUseCase => {
    return async (input: RegisterOrderInput) => {
        const dealer = await _dealerRepository.getBySiret(input.dealer);
        if (!dealer.success) return Result.Failure(registerOrderErrors.NOT_FOUND_DEALER)

        const sparePartReferences = input.orderLines.map((line) => line.reference)
        for (const reference of sparePartReferences) {
            const sparePart = await _inventorySparePartRepository.find(reference)
            if (!sparePart.success) return Result.Failure(registerOrderErrors.CANNOT_CREATE_ORDER_WITH_NOT_FOUND_REFERENCE)
        }

        const registerOrderEvent = new RegisterOrderEvent({
            orderId: Order.generateID(),
            deliveredAt: input.deliveryDate,
            orderedAt: input.orderedDate,
            siret: input.dealer.getValue(),
            lines: input.orderLines
        })
        const repositoryResponse = await _eventRepository.storeEvent(registerOrderEvent);
        if (!repositoryResponse.success) return repositoryResponse
        return Result.Success("Order registered successfully")
    }
}