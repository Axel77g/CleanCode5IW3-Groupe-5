
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
import {showCustomerUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/customer/showCustomerUseCase";
import {customerIdRequest} from "@infrastructureCore/requests/maintenance/customer/customerIdRequest";
import {registerCustomerRequest} from "@infrastructureCore/requests/maintenance/customer/registerCustomerRequest";
import {
    registerCustomerUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/customer/registerCustomerUseCase";
import {
    unregisterCustomerUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/customer/unregisterCustomerUseCase";
import {listCustomerUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/customer/listCustomerUseCase";
import {
    listCustomerVehiculesUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/customer/listCustomerVehiculesUseCase";
import {
    paginatedWithCustomerIdRequest
} from "@infrastructureCore/requests/maintenance/customer/paginatedWithCustomerIdRequest";
import {
    updateCustomerUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/customer/updateCustomerUseCase";
import {updateCustomerRequest} from "@infrastructureCore/requests/maintenance/customer/updateCustomerRequest";
import {listGarageUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/garage/listGarageUseCase";
import {
    paginatedWithGarageSiretRequest
} from "@infrastructureCore/requests/maintenance/garage/paginatedWithGarageSiretRequest";
import {showGarageUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/garage/showGarageUseCase";
import {registerGarageRequest} from "@infrastructureCore/requests/maintenance/garage/registerGarageRequest";
import {
    registerGarageUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/garage/registerGarageUseCase";
import {
    listGarageMaintenancesUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/garage/listGarageMaintenancesUseCase";
import {
    listMaintenanceUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/maintenance/listMaintenanceUseCase";
import {
    registerMaintenanceUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/maintenance/registerMaintenanceUseCase";
import {
    registerMaintenanceRequest
} from "@infrastructureCore/requests/maintenance/maintenance/registerMaintenanceRequest";
import {
    showMaintenanceUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/maintenance/showMaintenanceUseCase";
import {showMaintenanceRequest} from "@infrastructureCore/requests/maintenance/maintenance/showMaintenanceRequest";
import {
    updateMaintenanceUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/maintenance/updateMaintenanceUseCase";
import {updateMaintenanceRequest} from "@infrastructureCore/requests/maintenance/maintenance/updateMaintenanceRequest";
import {
    listVehiculesUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicule/listVehiculesUseCase";
import {
    registerVehiculeUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicule/registerVehiculeUseCase";
import {registerVehiculeRequest} from "@infrastructureCore/requests/maintenance/vehicule/registerVehiculeRequest";
import {immatriculationRequest} from "@infrastructureCore/requests/maintenance/vehicule/vehiculeImmatriculationRequest";
import {showVehiculeUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/vehicule/showVehiculeUseCase";
import {
    unregisterVehiculeUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicule/unregisterVehiculeUseCase";
import {
    updateVehiculeUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicule/updateVehiculeUseCase";
import {updateVehiculeRequest} from "@infrastructureCore/requests/maintenance/vehicule/updateVehiculeRequest";
import {
    listVehiculeMaintenanceUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicule/listVehiculeMaintenanceUseCase";
import {
    paginatedWithImmatriculationRequest
} from "@infrastructureCore/requests/maintenance/vehicule/paginatedWithImmatriculationRequest";
import {
    listVehiculesBreakdownUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicule/listVehiculesBreakdownUseCase";
import {
    assignVehiculeToCustomerRequest
} from "@infrastructureCore/requests/maintenance/vehicule/assignVehiculeToCustomerRequest";
import {
    assignVehiculeToCustomerUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicule/assignVehiculeToCustomerUseCase";
import {
    showVehiculeBreakdownUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehiculeBreakdown/showVehiculeBreakdownUseCase";
import {
    showVehiculeBreakdownRequest
} from "@infrastructureCore/requests/maintenance/vehiculeBreakdown/showVehiculeBreakdownRequest";
import {
    registerVehiculeBreakdownRequest
} from "@infrastructureCore/requests/maintenance/vehiculeBreakdown/registerVehiculeBreakdownRequest";
import {
    registerVehiculeBreakdownUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehiculeBreakdown/registerVehiculeBreakdownUseCase";
import {
    assignVehiculeBreakdownToMaintenanceUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehiculeBreakdown/assignVehiculeBreakdownToMaintenanceUseCase";
import {
    assignVehiculeBreakdownToMaintenanceRequest
} from "@infrastructureCore/requests/maintenance/vehiculeBreakdown/assignVehiculeBreakdownToMaintenanceRequest";
import {
    unregisterGarageUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/garage/unregisterGarageUseCase";

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

    get('/customers', listCustomerUseCase, paginatedRequest);
    get("/customers/:customerId", showCustomerUseCase, customerIdRequest);
    post('/customers', registerCustomerUseCase,  registerCustomerRequest);
    del('/customers/:customerId', unregisterCustomerUseCase, customerIdRequest);
    patch('/customers/:customerId', updateCustomerUseCase,  updateCustomerRequest);
    get("/customers/:customerId/vehicles", listCustomerVehiculesUseCase, paginatedWithCustomerIdRequest);

    get("/garages", listGarageUseCase , paginatedRequest);
    get("/garages/:siret", showGarageUseCase , siretRequest);
    post('/garages', registerGarageUseCase, registerGarageRequest);
    del('/garages/:siret', unregisterGarageUseCase, siretRequest);
    get("/garages/:garageSiret/maintenances", listGarageMaintenancesUseCase, paginatedWithGarageSiretRequest);

    get("/maintenances", listMaintenanceUseCase, paginatedRequest);
    post('/maintenances', registerMaintenanceUseCase, registerMaintenanceRequest);
    get("/maintenances/:maintenanceId", showMaintenanceUseCase, showMaintenanceRequest);
    patch("/maintenances/:maintenanceId", updateMaintenanceUseCase, updateMaintenanceRequest);

    get("/vehicles", listVehiculesUseCase, paginatedRequest);
    post("/vehicles", registerVehiculeUseCase, registerVehiculeRequest);
    get("/vehicles/:immatriculation", showVehiculeUseCase, immatriculationRequest);
    del("/vehicles/:immatriculation", unregisterVehiculeUseCase, immatriculationRequest);
    patch("/vehicles/:immatriculation", updateVehiculeUseCase, updateVehiculeRequest);
    get('/vehicles/:immatriculation/maintenances', listVehiculeMaintenanceUseCase, paginatedWithImmatriculationRequest)
    get('/vehicles/:immatriculation/breakdowns', listVehiculesBreakdownUseCase, paginatedWithImmatriculationRequest)
    post("/vehicles/:vehiculeImmatriculation/assign-customer", assignVehiculeToCustomerUseCase, assignVehiculeToCustomerRequest);

    get("/vehicle-breakdowns/:vehiculeBreakdownId", showVehiculeBreakdownUseCase, showVehiculeBreakdownRequest)
    post("/vehicle-breakdowns", registerVehiculeBreakdownUseCase, registerVehiculeBreakdownRequest)
    post("/vehicle-breakdowns/:vehiculeBreakdownId/assign-maintenance", assignVehiculeBreakdownToMaintenanceUseCase, assignVehiculeBreakdownToMaintenanceRequest)

    savePostManCollection({
        baseUrl: 'http://localhost:3000',
    });
}