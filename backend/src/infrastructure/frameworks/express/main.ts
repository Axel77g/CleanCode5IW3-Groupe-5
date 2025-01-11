import {server} from "./server";
import {del, get, patch, post} from "./core/registerRoute";
import {registerDriverRequest} from "./requests/testDrive/registerDriverRequest";
import {registerDriverController} from "./controllers/testDrive/registerDriverController";
import "./projections/setupProjection";
import {showDriverController} from "@expressApp/controllers/testDrive/showDriverController";
import {showDriverRequest} from "@expressApp/requests/testDrive/showDriverRequest";
import {listDriversController} from "@expressApp/controllers/testDrive/listDriversController";
import {paginatedRequest} from "@expressApp/requests/paginatedRequest";
import {patchDriverController} from "@expressApp/controllers/testDrive/patchDriverController";
import {patchDriverRequest} from "@expressApp/requests/testDrive/patchDriverRequest";
import {listDriversIncidentsController} from "@expressApp/controllers/testDrive/listDriversIncidentsController";
import {paginatedWithDriverLicenseIdRequest} from "@expressApp/requests/testDrive/paginatedWithDriverLicenseIdRequest";
import {listDriverTestsDrivesController} from "@expressApp/controllers/testDrive/listDriverTestsDrivesController";
import {registerTestDriveController} from "@expressApp/controllers/testDrive/registerTestDriveController";
import {registerTestDriveRequest} from "@expressApp/requests/testDrive/registerTestDriveRequest";
import {registerIncidentController} from "@expressApp/controllers/testDrive/registerIncidentController";
import {registerIncidentRequest} from "@expressApp/requests/testDrive/registerIncidentRequest";
import {showDealerController} from "@expressApp/controllers/inventoryManagement/showDealerController";
import {siretRequest} from "@expressApp/requests/inventoryManagement/siretRequest";
import {unregisterDealerController} from "@expressApp/controllers/inventoryManagement/unregisterDealerController";
import {registerDealerController} from "@expressApp/controllers/inventoryManagement/registerDealerController";
import {registerDealerRequest} from "@expressApp/requests/inventoryManagement/registerDealerRequest";
import {listDealerController} from "@expressApp/controllers/inventoryManagement/listDealerController";


const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

get("/dealers", listDealerController, paginatedRequest);
post('/dealers', registerDealerController, registerDealerRequest);
get('/dealers/:siret', showDealerController, siretRequest);
del('/dealers/:siret', unregisterDealerController, siretRequest);

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