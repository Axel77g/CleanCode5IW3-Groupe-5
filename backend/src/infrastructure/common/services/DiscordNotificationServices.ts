import {NotificationServices} from "@application/shared/services/NotificationServices";
import {Siret} from "@domain/shared/value-object/Siret";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import { Vehicule } from "@domain/maintenance/entities/Vehicule";

export class DiscordNotificationServices implements NotificationServices {
    constructor(private webhookUrl: string) {}

    async notifyMaintenance(vehicule: Vehicule): Promise<void> {
        await this.send(`Maintenance reminder for vehicule ${vehicule.immatriculation.getValue()}`);
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