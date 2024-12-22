import {InventorySparePart} from "../../../domain/inventoryManagement/entities/InventorySparePart";
import {DealerSiret} from "../../../domain/inventoryManagement/value-object/DealerSiret";

export interface NotificationServices {
    notifyLowStock(siret : DealerSiret, sparePart: InventorySparePart): void
}