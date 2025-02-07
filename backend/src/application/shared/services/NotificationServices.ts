import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import { Siret } from '@domain/shared/value-object/Siret';
import {Vehicule} from "@domain/maintenance/entities/Vehicule";

export interface NotificationServices {
    notifyLowStock(siret : Siret, sparePart: InventorySparePart): void
    notifyMaintenance(vehicule: Vehicule): Promise<void>;
}