import { IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Order} from "@domain/inventoryManagement/entities/Order";
import {OrderLine} from "@domain/inventoryManagement/value-object/OrderLine";
import {Result} from "@shared/Result";
import { Siret } from '@domain/shared/value-object/Siret';
import {ApplicationException} from "@shared/ApplicationException";
import {InventorySparePartRepository} from "@application/inventoryManagement/repositories/InventorySparePartRepository";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {DealerRepository} from "@application/inventoryManagement/repositories/DealerRepository";

interface RegisterOrderInput extends IInputUseCase{
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

export const createRegisterOrderUseCase = (_eventRepository : EventRepository, _dealerRepository: DealerRepository, _inventorySparePartRepository : InventorySparePartRepository) : RegisterOrderUseCase => {
    return async (input: RegisterOrderInput) => {
        const dealer = await _dealerRepository.getBySiret(input.dealer);
        if(!dealer.success) return dealer
        if(dealer.empty) return Result.Failure(registerOrderErrors.NOT_FOUND_DEALER)

        const sparePartReferences = input.orderLines.map(line => line.reference);
        const sparePartsResponse = await _inventorySparePartRepository.findAll(sparePartReferences);
        if (!sparePartsResponse.success) return sparePartsResponse;
        const missingReferences = sparePartReferences.filter(ref => !sparePartsResponse.value.some(sp => sp.reference === ref));
        if (missingReferences.length > 0) return Result.Failure(registerOrderErrors.CANNOT_CREATE_ORDER_WITH_NOT_FOUND_REFERENCE);

        const order = Order.create({
            orderId: Order.generateID(),
            orderedAt: input.orderedDate,
            deliveredAt: input.deliveryDate,
            siret: input.dealer,
            lines: input.orderLines
        })
        if(order instanceof ApplicationException) return Result.Failure(order)
        const repositoryResponse = await _eventRepository.storeEvent(order.registerEvent());
        if(!repositoryResponse.success) return repositoryResponse
        return Result.Success("Order registered successfully")
    }
}