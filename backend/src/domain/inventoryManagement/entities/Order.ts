import {Dealer} from "./Dealer";
import {OrderLine} from "../value-object/OrderLine";

export class Order {
    constructor(
      public readonly id: string,
      public readonly orderedAt: Date,
      public readonly dealer: Dealer,
      public readonly OrderLines: OrderLine[]
    ) {
    }
}