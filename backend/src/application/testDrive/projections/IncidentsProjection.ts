import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {IEvent} from "@shared/AbstractEvent";
import {RegisterIncidentEvent} from "@domain/testDrive/Events/RegisterIncidentEvent";
import {IncidentRepository} from "../repositories/IncidentRepository";
import {Incident} from "@domain/testDrive/entities/Incident";
import {ProjectionJobScheduler} from "@application/shared/projections/ProjectionJobScheduler";
import {Result, VoidResult} from "@shared/Result";

export class IncidentsProjection extends AbstractProjection{
    constructor(private _incidentRepository: IncidentRepository) {
        super()
    }

    init(projectionJobScheduler: ProjectionJobScheduler) {
        projectionJobScheduler.schedule(RegisterIncidentEvent.type, this.constructor.name)
    }

    bindEvents(){
        return {
            [RegisterIncidentEvent.type]: this.applyIncidentCreatedEvent
        }
    }

    async applyIncidentCreatedEvent(event: RegisterIncidentEvent) : Promise<VoidResult> {
        const incident = Incident.fromObject(event.payload)
        if(incident instanceof Error) return Result.Failure(incident)
        await this._incidentRepository.store(incident);
        return Result.SuccessVoid()
    }
}