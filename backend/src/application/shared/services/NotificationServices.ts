import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import { Siret } from '@domain/shared/value-object/Siret';
import {Vehicle} from "@domain/maintenance/entities/Vehicle";

export interface NotificationServices {
    notifyLowStock(siret : Siret, sparePart: InventorySparePart): void
    notifyMaintenance(vehicle: Vehicle): Promise<void>;
}