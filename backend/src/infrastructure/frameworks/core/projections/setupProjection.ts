import {testsDrivesProjection} from "@infrastructureCore/projections/testDrive/testsDrivesProjection";
import {driverProjection} from "@infrastructureCore/projections/testDrive/driverProjection";
import {incidentsProjection} from "@infrastructureCore/projections/testDrive/incidentsProjection";
import {ProjectionJobScheduler} from "@application/shared/projections/ProjectionJobScheduler";
import {
    testDriveProjectionJobRepository
} from "@infrastructureCore/repositories/testDrive/testDriveProjectionJobRepository";
import {eventObserver} from "@infrastructureCore/observers/eventObserver";
import {ProjectionsWorker} from "@application/shared/projections/ProjectionsWorker";
import {testDriveEventRepository} from "@infrastructureCore/repositories/testDrive/testDriveEventRepository";
import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {stockProjection} from "@infrastructureCore/projections/inventoryManagement/stockProjection";
import {orderProjection} from "@infrastructureCore/projections/inventoryManagement/orderProjection";
import {inventorySparePartProjection} from "@infrastructureCore/projections/inventoryManagement/inventorySparePartProjection";
import {dealerProjection} from "@infrastructureCore/projections/inventoryManagement/dealerProjection";
import {
    inventoryManagementEventRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository";
import {
    inventoryManagementProjectionJobRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementProjectionJobRepository";
import {customerProjection} from "@infrastructureCore/projections/maintenance/customerProjection";
import {
    maintenanceProjectionJobRepository
} from "@infrastructureCore/repositories/maintenance/maintenanceProjectionJobRepository";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";

function initProjection(scheduler: ProjectionJobScheduler, ...projections: AbstractProjection[]) {
    projections.forEach(projection => projection.init(scheduler));
}

/** Schedule the projection for inventoryManagement subdomain */
const inventoryManagementProjections = [stockProjection,orderProjection,inventorySparePartProjection,dealerProjection]
const inventoryManagementProjectionScheduler = new ProjectionJobScheduler(inventoryManagementProjectionJobRepository, eventObserver)
const inventoryManagementProjectionWorker = new ProjectionsWorker(inventoryManagementProjectionJobRepository, inventoryManagementEventRepository, inventoryManagementProjections)
initProjection(inventoryManagementProjectionScheduler, ...inventoryManagementProjections)

/** Schedule the projection for testDrive subdomain */
const testDriveProjections = [driverProjection, incidentsProjection, testsDrivesProjection]
const testDriveProjectionScheduler = new ProjectionJobScheduler(testDriveProjectionJobRepository, eventObserver)
const projectionWorker = new ProjectionsWorker(testDriveProjectionJobRepository, testDriveEventRepository, testDriveProjections)
initProjection(testDriveProjectionScheduler, ...testDriveProjections)


/** Schedule the projection for maintenance subdomain */
const maintenanceProjections = [customerProjection]
const maintenanceProjectionScheduler = new ProjectionJobScheduler(maintenanceProjectionJobRepository, eventObserver)
const maintenanceProjectionWorker = new ProjectionsWorker(maintenanceProjectionJobRepository, maintenanceEventRepository, maintenanceProjections)
initProjection(maintenanceProjectionScheduler, ...maintenanceProjections)
