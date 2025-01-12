
import {del, get, patch, post, put, savePostManCollection} from "./core/registerRoute";
import {registerDriverRequest} from "@infrastructureCore/requests/testDrive/registerDriverRequest";
import {registerDriverController} from "./controllers/testDrive/registerDriverController";
import "@infrastructureCore/projections/setupProjection";
import {showDriverController} from "@expressApp/controllers/testDrive/showDriverController";
import {showDriverRequest} from "@infrastructureCore/requests/testDrive/showDriverRequest";
import {listDriversController} from "@expressApp/controllers/testDrive/listDriversController";
import {paginatedRequest} from "@infrastructureCore/requests/paginatedRequest";
import {patchDriverController} from "@expressApp/controllers/testDrive/patchDriverController";
import {patchDriverRequest} from "@infrastructureCore/requests/testDrive/patchDriverRequest";
import {listDriversIncidentsController} from "@expressApp/controllers/testDrive/listDriversIncidentsController";
import {paginatedWithDriverLicenseIdRequest} from "@infrastructureCore/requests/testDrive/paginatedWithDriverLicenseIdRequest";
import {listDriverTestsDrivesController} from "@expressApp/controllers/testDrive/listDriverTestsDrivesController";
import {registerTestDriveController} from "@expressApp/controllers/testDrive/registerTestDriveController";
import {registerTestDriveRequest} from "@infrastructureCore/requests/testDrive/registerTestDriveRequest";
import {registerIncidentController} from "@expressApp/controllers/testDrive/registerIncidentController";
import {registerIncidentRequest} from "@infrastructureCore/requests/testDrive/registerIncidentRequest";
import {showDealerController} from "@expressApp/controllers/inventoryManagement/showDealerController";
import {siretRequest} from "@infrastructureCore/requests/inventoryManagement/siretRequest";
import {unregisterDealerController} from "@expressApp/controllers/inventoryManagement/unregisterDealerController";
import {registerDealerController} from "@expressApp/controllers/inventoryManagement/registerDealerController";
import {registerDealerRequest} from "@infrastructureCore/requests/inventoryManagement/registerDealerRequest";
import {listDealerController} from "@expressApp/controllers/inventoryManagement/listDealerController";
import {showDealerStockController} from "@expressApp/controllers/inventoryManagement/showDealerStockController";
import {addSparePartInStockController} from "@expressApp/controllers/inventoryManagement/addSparePartInStockController";
import {updateStockRequest} from "@infrastructureCore/requests/inventoryManagement/updateStockRequest";
import {registerOrderController} from "@expressApp/controllers/inventoryManagement/registerOrderController";
import {registerOrderRequest} from "@infrastructureCore/requests/inventoryManagement/registerOrderRequest";
import {
    removeSparePartInStockController
} from "@expressApp/controllers/inventoryManagement/removeSparePartInStockController";
import {showOrderHistoryController} from "@expressApp/controllers/inventoryManagement/showOrderHistoryController";
import {updateOrderStatusRequest} from "@infrastructureCore/requests/inventoryManagement/updateOrderStatusRequest";
import {updateOrderStatusController} from "@expressApp/controllers/inventoryManagement/updateOrderStatusController";
import {
    listInventorySparePartController
} from "@expressApp/controllers/inventoryManagement/listInventorySparePartController";
import {
    upsertInventorySparePartController
} from "@expressApp/controllers/inventoryManagement/upsertInventorySparePartController";
import {sparePartRequest} from "@infrastructureCore/requests/inventoryManagement/sparePartRequest";

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

    savePostManCollection({
        baseUrl: 'http://localhost:3000',
    });
}