import {NotificationServices} from "@application/shared/services/NotificationServices";
import {Siret} from "@domain/shared/value-object/Siret";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import { Vehicle } from "@domain/maintenance/entities/Vehicle";

export class DiscordNotificationServices implements NotificationServices {
    constructor(private webhookUrl: string) {}

    async notifyMaintenance(vehicle: Vehicle): Promise<void> {
        await this.send(`Maintenance reminder for vehicle ${vehicle.immatriculation.getValue()}`);
    }

    private async send(message : string){
        return fetch(this.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({content: message}),
        })
    }

    notifyLowStock(siret: Siret, sparePart: InventorySparePart): void {
        this.send(`Low stock for ${siret.getValue()} on spare part ${sparePart.name} (reference: ${sparePart.reference})`);
    }

}