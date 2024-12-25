import {Dealer} from "./Dealer";
import {OrderLine} from "../value-object/OrderLine";
import {DealerSiret} from "../value-object/DealerSiret";

export class Order {
    constructor(
      public readonly id: string,
      public readonly orderedAt: Date,
      public readonly deliveredAt: Date,
      public readonly dealerSiret: DealerSiret,
      public readonly lines: OrderLine[]
    ) {}

    static generateID(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}