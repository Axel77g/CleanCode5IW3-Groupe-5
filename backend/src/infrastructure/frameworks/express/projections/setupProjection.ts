import {testsDrivesProjection} from "@expressApp/projections/testDrive/testsDrivesProjection";
import {driverProjection} from "@expressApp/projections/testDrive/driverProjection";
import {incidentsProjection} from "@expressApp/projections/testDrive/incidentsProjection";
import {ProjectionJobScheduler} from "@application/shared/projections/ProjectionJobScheduler";
import {
    testDriveEventProjectionJobRepository
} from "@expressApp/repositories/testDrive/testDriveEventProjectionJobRepository";
import {eventObserver} from "@expressApp/observers/eventObserver";
import {ProjectionsWorker} from "@application/shared/projections/ProjectionsWorker";
import {testDriveEventRepository} from "@expressApp/repositories/testDrive/testDriveEventRepository";
import {AbstractProjection} from "@application/shared/projections/AbstractProjection";

function initProjection(scheduler: ProjectionJobScheduler, ...projections: AbstractProjection[]) {
    projections.forEach(projection => projection.init(scheduler));
}

/** Schedule the projection for testDrive subdomain */
const testDriveProjections = [driverProjection, incidentsProjection, testsDrivesProjection]
const testDriveProjectionScheduler = new ProjectionJobScheduler(testDriveEventProjectionJobRepository, eventObserver)
const projectionWorker = new ProjectionsWorker(testDriveEventProjectionJobRepository, testDriveEventRepository, testDriveProjections)
initProjection(testDriveProjectionScheduler, ...testDriveProjections)
