
import "@infrastructureCore/projections/setupProjection";
import { registerDealerRequest } from "@infrastructureCore/requests/inventoryManagement/registerDealerRequest";
import { registerOrderRequest } from "@infrastructureCore/requests/inventoryManagement/registerOrderRequest";
import { siretRequest } from "@infrastructureCore/requests/inventoryManagement/siretRequest";
import { sparePartRequest } from "@infrastructureCore/requests/inventoryManagement/sparePartRequest";
import { updateOrderStatusRequest } from "@infrastructureCore/requests/inventoryManagement/updateOrderStatusRequest";
import { updateStockRequest } from "@infrastructureCore/requests/inventoryManagement/updateStockRequest";
import { paginatedRequest } from "@infrastructureCore/requests/paginatedRequest";
import { paginatedWithDriverLicenseIdRequest } from "@infrastructureCore/requests/testDrive/paginatedWithDriverLicenseIdRequest";
import { patchDriverRequest } from "@infrastructureCore/requests/testDrive/patchDriverRequest";
import { registerDriverRequest } from "@infrastructureCore/requests/testDrive/registerDriverRequest";
import { registerIncidentRequest } from "@infrastructureCore/requests/testDrive/registerIncidentRequest";
import { registerTestDriveRequest } from "@infrastructureCore/requests/testDrive/registerTestDriveRequest";
import { showDriverRequest } from "@infrastructureCore/requests/testDrive/showDriverRequest";
import { del, get, patch, post, put, savePostManCollection } from "./core/registerRoute";
import {listDealersUseCase} from "@infrastructureCore/useCaseImplementation/InventoryManagement/listDealersUseCase";
import {
    registerDealerUseCase
} from "@infrastructureCore/useCaseImplementation/InventoryManagement/registerDealerUseCase";
import {
    showDealerStockUseCase
} from "@infrastructureCore/useCaseImplementation/InventoryManagement/showDealerStockUseCase";
import {
    unregisterDealerUseCase
} from "@infrastructureCore/useCaseImplementation/InventoryManagement/unregisterDealerUseCase";
import {
    addSparePartInStockUseCase
} from "@infrastructureCore/useCaseImplementation/InventoryManagement/addSparePartInStockUseCase";
import {
    removeSparePartInStockUseCase
} from "@infrastructureCore/useCaseImplementation/InventoryManagement/removeSparePartInStockUseCase";
import {registerOrderUseCase} from "@infrastructureCore/useCaseImplementation/InventoryManagement/registerOrderUseCase";
import {
    updateOrderStatusUseCase
} from "@infrastructureCore/useCaseImplementation/InventoryManagement/updateOrderStatusUseCase";
import {showDealerUseCase} from "@infrastructureCore/useCaseImplementation/InventoryManagement/showDealerUseCase";
import {
    showOrderHistoryUseCase
} from "@infrastructureCore/useCaseImplementation/InventoryManagement/showOrderHistoryUseCase";
import {
    upsertInventorySparePartUseCase
} from "@infrastructureCore/useCaseImplementation/InventoryManagement/upsertInventorySparePartUseCase";
import {listDriversUseCase} from "@infrastructureCore/useCaseImplementation/testDrive/listDriversUseCase";
import {showDriverUseCase} from "@infrastructureCore/useCaseImplementation/testDrive/showDriverUseCase";
import {registerDriverUseCase} from "@infrastructureCore/useCaseImplementation/testDrive/registerDriverUseCase";
import {patchDriverUseCase} from "@infrastructureCore/useCaseImplementation/testDrive/patchDriverUseCase";
import {
    listDriverIncidentsUseCase
} from "@infrastructureCore/useCaseImplementation/testDrive/listDriverIncidentsUseCase";
import {registerIncidentUseCase} from "@infrastructureCore/useCaseImplementation/testDrive/registerIncidentUseCase";
import {
    listDriverTestsDrivesUseCase
} from "@infrastructureCore/useCaseImplementation/testDrive/listDriverTestsDrivesUseCase";
import {registerTestDriveUseCase} from "@infrastructureCore/useCaseImplementation/testDrive/registerTestDriveUseCase";
import {
    listInventorySparePartUseCase
} from "@infrastructureCore/useCaseImplementation/InventoryManagement/listInventorySparePartUseCase";

export const boot = () => {
    // Inventory Management Subdomain
    get("/dealers", listDealersUseCase, paginatedRequest);
    post('/dealers', registerDealerUseCase, registerDealerRequest);
    get('/dealers/:siret', showDealerUseCase, siretRequest);
    del('/dealers/:siret', unregisterDealerUseCase, siretRequest);

    get('/dealers/:siret/stock', showDealerStockUseCase, siretRequest);
    post('/dealers/:siret/stock/add', addSparePartInStockUseCase, updateStockRequest);
    post('/dealers/:siret/stock/remove', removeSparePartInStockUseCase, updateStockRequest);

    post('/orders', registerOrderUseCase, registerOrderRequest);
    get('/dealers/:siret/orders', showOrderHistoryUseCase, siretRequest);
    post('/orders/:orderId/status', updateOrderStatusUseCase, updateOrderStatusRequest);

    get("/inventory-spare-parts", listInventorySparePartUseCase, paginatedRequest);
    put('/inventory-spare-parts/:reference', upsertInventorySparePartUseCase, sparePartRequest);

    // Test Drive Subdomain
    get("/drivers", listDriversUseCase, paginatedRequest);
    get('/drivers/:driverLicenseId', showDriverUseCase, showDriverRequest);
    post('/drivers', registerDriverUseCase, registerDriverRequest);
    patch('/drivers/:driverLicenseId', patchDriverUseCase, patchDriverRequest);

    get('/drivers/:driverLicenseId/incidents', listDriverIncidentsUseCase, paginatedWithDriverLicenseIdRequest);
    get("/incidents", listDriverIncidentsUseCase, paginatedWithDriverLicenseIdRequest);
    post('/incidents', registerIncidentUseCase, registerIncidentRequest);

    get('/drivers/:driverLicenseId/tests-drives', listDriverTestsDrivesUseCase, paginatedWithDriverLicenseIdRequest);
    get('/tests-drives', listDriverTestsDrivesUseCase, paginatedWithDriverLicenseIdRequest);
    post('/tests-drives', registerTestDriveUseCase, registerTestDriveRequest);

    // Maintenance Subdomain
    // get('/customers/:customerId', showCustomerController, customerIdRequest);
    // post('/customers', registerCustomerController, registerCustomerRequest);
    // del('/customers/:customerId', unregisterCustomerController, customerIdRequest);
    //
    // get('/garages/:siret', showGarageController, siretRequest);
    // post('/garages', registerDealerController, registerDealerRequest);
    // del('/garages/:siret', unregisterDealerController, siretRequest);

    savePostManCollection({
        baseUrl: 'http://localhost:3000',
    });
}