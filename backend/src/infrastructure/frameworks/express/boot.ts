
import { addSparePartInStockController } from "@expressApp/controllers/inventoryManagement/addSparePartInStockController";
import { listDealerController } from "@expressApp/controllers/inventoryManagement/listDealerController";
import {
    listInventorySparePartController
} from "@expressApp/controllers/inventoryManagement/listInventorySparePartController";
import { registerDealerController } from "@expressApp/controllers/inventoryManagement/registerDealerController";
import { registerOrderController } from "@expressApp/controllers/inventoryManagement/registerOrderController";
import {
    removeSparePartInStockController
} from "@expressApp/controllers/inventoryManagement/removeSparePartInStockController";
import { showDealerController } from "@expressApp/controllers/inventoryManagement/showDealerController";
import { showDealerStockController } from "@expressApp/controllers/inventoryManagement/showDealerStockController";
import { showOrderHistoryController } from "@expressApp/controllers/inventoryManagement/showOrderHistoryController";
import { unregisterDealerController } from "@expressApp/controllers/inventoryManagement/unregisterDealerController";
import { updateOrderStatusController } from "@expressApp/controllers/inventoryManagement/updateOrderStatusController";
import {
    upsertInventorySparePartController
} from "@expressApp/controllers/inventoryManagement/upsertInventorySparePartController";
import { registerCustomerController } from "@expressApp/controllers/maintenance/registerCustomerController";
import { showCustomerController } from "@expressApp/controllers/maintenance/showCustomerController";
import { unregisterCustomerController } from "@expressApp/controllers/maintenance/unregisterCustomerController";
import { listDriversController } from "@expressApp/controllers/testDrive/listDriversController";
import { listDriversIncidentsController } from "@expressApp/controllers/testDrive/listDriversIncidentsController";
import { listDriverTestsDrivesController } from "@expressApp/controllers/testDrive/listDriverTestsDrivesController";
import { patchDriverController } from "@expressApp/controllers/testDrive/patchDriverController";
import { registerIncidentController } from "@expressApp/controllers/testDrive/registerIncidentController";
import { registerTestDriveController } from "@expressApp/controllers/testDrive/registerTestDriveController";
import { showDriverController } from "@expressApp/controllers/testDrive/showDriverController";
import "@infrastructureCore/projections/setupProjection";
import { registerDealerRequest } from "@infrastructureCore/requests/inventoryManagement/registerDealerRequest";
import { registerOrderRequest } from "@infrastructureCore/requests/inventoryManagement/registerOrderRequest";
import { siretRequest } from "@infrastructureCore/requests/inventoryManagement/siretRequest";
import { sparePartRequest } from "@infrastructureCore/requests/inventoryManagement/sparePartRequest";
import { updateOrderStatusRequest } from "@infrastructureCore/requests/inventoryManagement/updateOrderStatusRequest";
import { updateStockRequest } from "@infrastructureCore/requests/inventoryManagement/updateStockRequest";
import { customerIdRequest } from "@infrastructureCore/requests/maintenance/customerIdRequest";
import { registerCustomerRequest } from "@infrastructureCore/requests/maintenance/registerCustomerRequest";
import { paginatedRequest } from "@infrastructureCore/requests/paginatedRequest";
import { paginatedWithDriverLicenseIdRequest } from "@infrastructureCore/requests/testDrive/paginatedWithDriverLicenseIdRequest";
import { patchDriverRequest } from "@infrastructureCore/requests/testDrive/patchDriverRequest";
import { registerDriverRequest } from "@infrastructureCore/requests/testDrive/registerDriverRequest";
import { registerIncidentRequest } from "@infrastructureCore/requests/testDrive/registerIncidentRequest";
import { registerTestDriveRequest } from "@infrastructureCore/requests/testDrive/registerTestDriveRequest";
import { showDriverRequest } from "@infrastructureCore/requests/testDrive/showDriverRequest";
import { showGarageController } from "./controllers/maintenance/showGarageController";
import { registerDriverController } from "./controllers/testDrive/registerDriverController";
import { del, get, patch, post, put, savePostManCollection } from "./core/registerRoute";

export const boot = () => {
    // Inventory Management Subdomain
    get("/dealers", listDealerController, paginatedRequest);
    post('/dealers', registerDealerController, registerDealerRequest);
    get('/dealers/:siret', showDealerController, siretRequest);
    del('/dealers/:siret', unregisterDealerController, siretRequest);

    get('/dealers/:siret/stock', showDealerStockController, siretRequest);
    post('/dealers/:siret/stock/add', addSparePartInStockController, updateStockRequest);
    post('/dealers/:siret/stock/remove', removeSparePartInStockController, updateStockRequest);

    post('/orders', registerOrderController, registerOrderRequest);
    get('/dealers/:siret/orders', showOrderHistoryController, siretRequest);
    post('/orders/:orderId/status', updateOrderStatusController, updateOrderStatusRequest);

    get("/inventory-spare-parts", listInventorySparePartController, paginatedRequest);
    put('/inventory-spare-parts/:reference', upsertInventorySparePartController, sparePartRequest);

    // Test Drive Subdomain
    get("/drivers", listDriversController, paginatedRequest);
    get('/drivers/:driverLicenseId', showDriverController, showDriverRequest);
    post('/drivers', registerDriverController, registerDriverRequest);
    patch('/drivers/:driverLicenseId', patchDriverController, patchDriverRequest);

    get('/drivers/:driverLicenseId/incidents', listDriversIncidentsController, paginatedWithDriverLicenseIdRequest);
    get("/incidents", listDriversIncidentsController, paginatedWithDriverLicenseIdRequest);
    post('/incidents', registerIncidentController, registerIncidentRequest);

    get('/drivers/:driverLicenseId/tests-drives', listDriverTestsDrivesController, paginatedWithDriverLicenseIdRequest);
    get('/tests-drives', listDriverTestsDrivesController, paginatedWithDriverLicenseIdRequest);
    post('/tests-drives', registerTestDriveController, registerTestDriveRequest);

    // Maintenance Subdomain
    get('/customers/:customerId', showCustomerController, customerIdRequest);
    post('/customers', registerCustomerController, registerCustomerRequest);
    del('/customers/:customerId', unregisterCustomerController, customerIdRequest);

    get('/garages/:siret', showGarageController, siretRequest);
    post('/garages', registerDealerController, registerDealerRequest);
    del('/garages/:siret', unregisterDealerController, siretRequest);

    savePostManCollection({
        baseUrl: 'http://localhost:3000',
    });
}