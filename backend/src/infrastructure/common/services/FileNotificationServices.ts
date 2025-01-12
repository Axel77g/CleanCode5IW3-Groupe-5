import {NotificationServices} from "@application/inventoryManagement/services/NotificationServices";
import {Siret} from "@domain/shared/value-object/Siret";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import * as fs from "node:fs";

export class FileNotificationServices implements NotificationServices{
    notifyLowStock(siret : Siret, sparePart: InventorySparePart): void {
        fs.appendFileSync('notification.txt', `Low stock for ${sparePart.reference} at ${siret.getValue()}\n`);
    }
}