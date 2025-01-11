import {testsDrivesProjection} from "@expressApp/projections/testDrive/testsDrivesProjection";
import {driverProjection} from "@expressApp/projections/testDrive/driverProjection";
import {incidentsProjection} from "@expressApp/projections/testDrive/incidentsProjection";
import {ProjectionJobScheduler} from "@application/shared/projections/ProjectionJobScheduler";
import {
    testDriveProjectionJobRepository
} from "@expressApp/repositories/testDrive/testDriveProjectionJobRepository";
import {eventObserver} from "@expressApp/observers/eventObserver";
import {ProjectionsWorker} from "@application/shared/projections/ProjectionsWorker";
import {testDriveEventRepository} from "@expressApp/repositories/testDrive/testDriveEventRepository";
import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {stockProjection} from "@expressApp/projections/inventoryManagement/stockProjection";
import {orderProjection} from "@expressApp/projections/inventoryManagement/orderProjection";
import {inventorySparePartProjection} from "@expressApp/projections/inventoryManagement/inventorySparePartProjection";
import {dealerProjection} from "@expressApp/projections/inventoryManagement/dealerProjection";
import {
    inventoryManagementEventRepository
} from "@expressApp/repositories/inventoryManagement/inventoryManagementEventRepository";
import {
    inventoryManagementProjectionJobRepository
} from "@expressApp/repositories/inventoryManagement/inventoryManagementProjectionJobRepository";

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
