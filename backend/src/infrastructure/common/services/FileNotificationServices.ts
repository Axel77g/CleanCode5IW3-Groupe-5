import {NotificationServices} from "@application/shared/services/NotificationServices";
import {Siret} from "@domain/shared/value-object/Siret";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import * as fs from "node:fs";
import {Vehicule} from "@domain/maintenance/entities/Vehicule";

export class FileNotificationServices implements NotificationServices{
    notifyLowStock(siret : Siret, sparePart: InventorySparePart): void {
        fs.appendFileSync('notification.txt', `Low stock for ${sparePart.reference} at ${siret.getValue()}\n`);
    }

    async notifyMaintenance(vehicule: Vehicule) : Promise<void> {
        fs.appendFileSync('notification.txt', `Maintenance reminder for vehicule ${vehicule.immatriculation.getValue()}\n`);
    }
}