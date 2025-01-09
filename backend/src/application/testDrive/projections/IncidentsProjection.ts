import {IProjection} from "../../../shared/IProjection";
import {IEvent} from "../../../shared/AbstractEvent";
import {RegisterIncidentEvent} from "../../../domain/testDrive/Events/RegisterIncidentEvent";
import {IncidentRepository} from "../repositories/IncidentRepository";
import {Incident} from "../../../domain/testDrive/entities/Incident";

export class IncidentsProjection implements IProjection{
    constructor(private _incidentRepository: IncidentRepository) {}
    async receive(event: IEvent) : Promise<void> {
        switch (event.constructor) {
            case RegisterIncidentEvent:
                await this.applyIncidentCreatedEvent(event as RegisterIncidentEvent)
                break;
        }
    }

    async applyIncidentCreatedEvent(event: RegisterIncidentEvent) {
        const incident = Incident.fromObject(event.payload)
        if(incident instanceof Error) return console.error(incident)
        await this._incidentRepository.store(incident);
    }
}