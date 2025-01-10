import {IProjection} from "../../../shared/IProjection";
import {IEvent} from "../../../shared/AbstractEvent";
import {DealerRepository} from "../repositories/DealerRepository";
import {RegisterDealerEvent} from "../../../domain/inventoryManagement/events/RegisterDealerEvent";
import {UnregisterDealerEvent} from "../../../domain/inventoryManagement/events/UnregisterDealerEvent";
import {Dealer} from "../../../domain/inventoryManagement/entities/Dealer";
import {Siret} from "../../../domain/shared/value-object/Siret";

export class DealerProjection implements IProjection {
    constructor(private _dealerRepository: DealerRepository) {}
    async receive(event: IEvent) : Promise<void> {
        switch (event.constructor) {
            case RegisterDealerEvent:
                await this.applyRegisterDealerEvent(event as RegisterDealerEvent)
                break;
            case UnregisterDealerEvent:
                await this.applyUnregisterDealerEvent(event as UnregisterDealerEvent)
                break;
        }
    }

    async applyRegisterDealerEvent(event: RegisterDealerEvent) {
        const dealer = Dealer.fromObject(event.payload)
        if(dealer instanceof Error) return console.error(dealer)
        await this._dealerRepository.store(dealer)
    }

    async applyUnregisterDealerEvent(event : UnregisterDealerEvent) {
        const siret = Siret.create(event.payload.siret)
        if(siret instanceof Error) return console.error(siret)
        const dealerFromRepo = await this._dealerRepository.getBySiret(siret)
        if(!dealerFromRepo.success) return console.error(dealerFromRepo.error)
        await this._dealerRepository.delete(dealerFromRepo.value.siret)
    }
}

