import {NotificationServices} from "@application/inventoryManagement/services/NotificationServices";
import {Siret} from "@domain/shared/value-object/Siret";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";

export class DiscordNotificationServices implements NotificationServices{
    constructor(private webhookUrl: string) {}

    private send(message : string){
        fetch(this.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({content: message}),
        }).then()
    }

    notifyLowStock(siret: Siret, sparePart: InventorySparePart): void {
        this.send(`Low stock for ${siret.getValue()} on spare part ${sparePart.name} (reference: ${sparePart.reference})`);
    }

}