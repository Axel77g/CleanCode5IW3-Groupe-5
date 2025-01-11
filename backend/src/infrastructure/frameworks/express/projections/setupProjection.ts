import { AbstractProjection } from "@application/shared/projections/AbstractProjection";
import { ProjectionJobScheduler } from "@application/shared/projections/ProjectionJobScheduler";
import { ProjectionsWorker } from "@application/shared/projections/ProjectionsWorker";
import { eventObserver } from "@expressApp/observers/eventObserver";
import { driverProjection } from "@expressApp/projections/testDrive/driverProjection";
import { incidentsProjection } from "@expressApp/projections/testDrive/incidentsProjection";
import { testsDrivesProjection } from "@expressApp/projections/testDrive/testsDrivesProjection";
import {
    testDriveEventProjectionJobRepository
} from "@expressApp/repositories/testDrive/testDriveEventProjectionJobRepository";
import { testDriveEventRepository } from "@expressApp/repositories/testDrive/testDriveEventRepository";
import { maintenanceEventRepository } from "../repositories/maintenance/maintenanceEventRepository";
import { maintenanceProjectionJobRepository } from "../repositories/maintenance/maintenanceProjectionJobRepository";
import { customerProjection } from "./maintenance/customerProjection";

function initProjection(scheduler: ProjectionJobScheduler, ...projections: AbstractProjection[]) {
    projections.forEach(projection => projection.init(scheduler));
}

/** Schedule the projection for testDrive subdomain */
const testDriveProjections = [driverProjection, incidentsProjection, testsDrivesProjection]
const testDriveProjectionScheduler = new ProjectionJobScheduler(testDriveEventProjectionJobRepository, eventObserver)
const testDriveProjectionWorker = new ProjectionsWorker(testDriveEventProjectionJobRepository, testDriveEventRepository, testDriveProjections)
initProjection(testDriveProjectionScheduler, ...testDriveProjections)

/** Schedule the projection for maintenance subdomain */
const maintenanceProjections = [customerProjection]
const maintenanceProjectionScheduler = new ProjectionJobScheduler(maintenanceProjectionJobRepository, eventObserver)
const maintenanceProjectionWorker = new ProjectionsWorker(maintenanceProjectionJobRepository, maintenanceEventRepository, maintenanceProjections)
initProjection(maintenanceProjectionScheduler, ...maintenanceProjections)