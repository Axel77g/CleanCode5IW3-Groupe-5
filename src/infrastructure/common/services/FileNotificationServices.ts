import {NotificationServices} from "@application/shared/services/NotificationServices";
import {Siret} from "@domain/shared/value-object/Siret";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import * as fs from "node:fs";
import {Vehicle} from "@domain/maintenance/entities/Vehicle";

export class FileNotificationServices implements NotificationServices{
    notifyLowStock(siret : Siret, sparePart: InventorySparePart): void {
        fs.appendFileSync('notification.txt', `Low stock for ${sparePart.reference} at ${siret.getValue()}\n`);
    }

    async notifyMaintenance(vehicle: Vehicle) : Promise<void> {
        fs.appendFileSync('notification.txt', `Maintenance reminder for vehicle ${vehicle.immatriculation.getValue()}\n`);
    }
}