import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import { Siret } from '@domain/shared/value-object/Siret';

export interface NotificationServices {
    notifyLowStock(siret : Siret, sparePart: InventorySparePart): void
}