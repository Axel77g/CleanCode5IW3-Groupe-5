import { Siret } from "../../shared/value-object/Siret";
import { OrderLine } from "../value-object/OrderLine";

export class Order {
  constructor(
    public readonly id: string,
    public readonly orderedAt: Date,
    public readonly deliveredAt: Date,
    public readonly siret: Siret,
    public readonly lines: OrderLine[]
  ) { }

  static generateID(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}