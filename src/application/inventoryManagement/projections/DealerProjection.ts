import {RegisterDealerEvent} from "@domain/inventoryManagement/events/RegisterDealerEvent";
import {UnregisterDealerEvent} from "@domain/inventoryManagement/events/UnregisterDealerEvent";
import {Dealer} from "@domain/inventoryManagement/entities/Dealer";
import {Siret} from "@domain/shared/value-object/Siret";
import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {ProjectionJobScheduler} from "@application/shared/projections/ProjectionJobScheduler";
import {Result, VoidResult} from "@shared/Result";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {DealerRepository} from "@application/inventoryManagement/repositories/DealerRepository";

export class DealerProjection extends AbstractProjection {
    constructor(private _dealerRepository: DealerRepository) {
        super()
    }

    init(projectionJobScheduler: ProjectionJobScheduler) {
        projectionJobScheduler.schedule(RegisterDealerEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UnregisterDealerEvent.type, this.constructor.name)
    }

    bindEvents() {
        return {
            [RegisterDealerEvent.type]: this.applyRegisterDealerEvent,
            [UnregisterDealerEvent.type]: this.applyUnregisterDealerEvent
        }
    }

    async applyRegisterDealerEvent(event: RegisterDealerEvent): Promise<VoidResult> {
        const dealer = Dealer.fromObject(event.payload)
        if(dealer instanceof ApplicationException) return Result.Failure(dealer)
        return this._dealerRepository.store(dealer)
    }

    async applyUnregisterDealerEvent(event: UnregisterDealerEvent): Promise<VoidResult> {
        const siret = Siret.create(event.payload.siret)
        if(siret instanceof ApplicationException) return Result.Failure(siret)
        const dealerFromRepo = await this._dealerRepository.getBySiret(siret)
        if(!dealerFromRepo.success) return dealerFromRepo
        if(dealerFromRepo.empty) return Result.Failure(NotFoundEntityException.create("Dealer not found during update projection, this should not happen, please check the event store"))
        return this._dealerRepository.delete(dealerFromRepo.value.siret)
    }
}

