import { Siret } from "../../shared/value-object/Siret";
import {OrderLine, OrderLineDTO} from "../value-object/OrderLine";
import {randomUUID} from "node:crypto";
import {OrderStatusEnum} from "../enums/OrderStatusEnum";
import {ApplicationException} from "@shared/ApplicationException";


export interface OrderDTO {
    orderId: string,
    orderedAt: Date,
    deliveredAt: Date,
    siret: string,
    lines: OrderLineDTO[]
    status ?: OrderStatusEnum,
    statusHistory ?: OrderStatusHistory[]
}

export interface OrderStatusHistory {
    status: OrderStatusEnum,
    date: Date
}

export class Order {

    static errors = {
        CANNOT_COMPLETE_CANCELED_ORDER: new ApplicationException("Order","Cannot complete a cancelled order"),
        CANNOT_CANCEL_COMPLETED_ORDER: new ApplicationException("Order","Cannot cancel a completed order"),
        CANNOT_PROCESS_ORDER: new ApplicationException("Order","Cannot process a cancelled or a completed order")
    }

    private constructor(
        public readonly orderId: string,
        public readonly orderedAt: Date,
        public readonly deliveredAt: Date,
        public readonly siret: Siret,
        public readonly lines: OrderLine[],
        public readonly status : OrderStatusEnum = OrderStatusEnum.PENDING,
        public readonly statusHistory : OrderStatusHistory[] = []
    ) { }

    complete() : Order | ApplicationException {
        if(this.status === OrderStatusEnum.CANCELED){
            return Order.errors.CANNOT_COMPLETE_CANCELED_ORDER;
        }
        return new Order(this.orderId, this.orderedAt, this.deliveredAt, this.siret, this.lines, OrderStatusEnum.COMPLETED, this.statusHistory);
    }

    cancel() : Order | ApplicationException {
        if(this.status === OrderStatusEnum.COMPLETED){
            return Order.errors.CANNOT_COMPLETE_CANCELED_ORDER;
        }
        return new Order(this.orderId, this.orderedAt, this.deliveredAt, this.siret, this.lines, OrderStatusEnum.CANCELED, this.statusHistory);
    }

    process() : Order | ApplicationException {
        if(this.status === OrderStatusEnum.CANCELED || this.status === OrderStatusEnum.COMPLETED){
            return Order.errors.CANNOT_PROCESS_ORDER;
        }
        return new Order(this.orderId, this.orderedAt, this.deliveredAt, this.siret, this.lines, OrderStatusEnum.IN_PROGRESS, this.statusHistory);
    }

    applyStatus(status : OrderStatusEnum) : Order | ApplicationException {
        switch (status) {
            case OrderStatusEnum.COMPLETED:
                return this.complete();
            case OrderStatusEnum.CANCELED:
                return this.cancel();
            case OrderStatusEnum.IN_PROGRESS:
                return this.process();
            default:
                return new ApplicationException("Order","Invalid status");
        }
    }

    static generateID(): string {
        return randomUUID();
    }

    static fromObject(object: OrderDTO): Order | ApplicationException {
        const siret = Siret.create(object.siret);
        if (siret instanceof ApplicationException) {
          return siret
        }
        const lines = object.lines.map(line => OrderLine.create(line));
        const error = lines.find(line => line instanceof ApplicationException) as ApplicationException | undefined;
        if (error) {
          return error
        }

        return new Order(object.orderId, object.orderedAt, object.deliveredAt, siret, lines as OrderLine[], object?.status, object?.statusHistory);
    }

    setStatusHistory(statusHistory : OrderStatusHistory[]){
        return new Order(this.orderId, this.orderedAt, this.deliveredAt, this.siret, this.lines, this.status, statusHistory);
    }
}