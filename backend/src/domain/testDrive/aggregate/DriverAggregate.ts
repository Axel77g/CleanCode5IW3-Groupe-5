import {Driver} from "../entities/Driver";
import {AbstractEvent} from "../../../shared/AbstractEvent";
import {DriverCreatedEvent} from "../Events/DriverCreatedEvent";
import {DriverUpdatedEvent} from "../Events/DriverUpdatedEvent";
import {DriverLicenseId} from "../value-object/DriverLicenseId";
import {IEventAggregate} from "../../../shared/IEventAggregate";
import {DriverPutDocumentEvent} from "../Events/DriverPutDocumentEvent";
import {DriverDocuments} from "../value-object/DriverDocuments";
import {DriverDocumentsTypes} from "../enums/DriverDocumentsTypes";
import {DriverDeleteDocumentEvent} from "../Events/DriverDeleteDocumentEvent";

export class DriverAggregate implements IEventAggregate<Driver>{
    private driver : Driver | null = null;
    private events : AbstractEvent[] = [];
    constructor(driverEvents: AbstractEvent[]){
        this.events = driverEvents;
    }

    aggregate(): Driver | null {
        this.events.forEach(event => {
            this.applyEvent(event);
        });
        return this.driver;
    }

    applyEvent(event: AbstractEvent) : Driver | null {
        if(event instanceof DriverCreatedEvent){
            this.driver = new Driver(
                new DriverLicenseId(event.driverLicenceId),
                event.firstName,
                event.lastName,
                event.email,
                event.driverLicensedAt,
                []
            );
        }

        if(event instanceof DriverUpdatedEvent){
            if(this.driver){
                this.driver = new Driver(
                    new DriverLicenseId(event.driverLicenceId),
                    event.firstName || this.driver.firstName,
                    event.lastName || this.driver.lastName,
                    event.email || this.driver.email,
                    this.driver.driverLicensedAt,
                    this.driver.documents
                );
            }
        }

        if(event instanceof DriverPutDocumentEvent){
            if(this.driver){
                let tempDocuments = [...this.driver.documents];
                tempDocuments = tempDocuments.filter(doc => doc.name !== event.name);
                tempDocuments.push(new DriverDocuments(event.name, event.type as DriverDocumentsTypes, event.description));
                return new Driver(
                    this.driver.driverLicenceId,
                    this.driver.firstName,
                    this.driver.lastName,
                    this.driver.email,
                    this.driver.driverLicensedAt,
                    tempDocuments
                )
            }
        }

        if(event instanceof DriverDeleteDocumentEvent){
            if(this.driver){
                let tempDocuments = [...this.driver.documents];
                tempDocuments = tempDocuments.filter(doc => doc.name !== event.name);
                return new Driver(
                    this.driver.driverLicenceId,
                    this.driver.firstName,
                    this.driver.lastName,
                    this.driver.email,
                    this.driver.driverLicensedAt,
                    tempDocuments
                )
            }
        }

        return this.driver
    }
}