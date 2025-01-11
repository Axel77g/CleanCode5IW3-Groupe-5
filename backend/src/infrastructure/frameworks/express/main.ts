import {server} from "./server";
import {get, patch, post, del} from "./core/registerRoute";
import {registerDriverRequest} from "./requests/registerDriverRequest";
import {registerDriverController} from "./controllers/testDrive/registerDriverController";
import "./projections/setupProjection";
import {showDriverController} from "@expressApp/controllers/testDrive/showDriverController";
import {showDriverRequest} from "@expressApp/requests/showDriverRequest";
import {listDriversController} from "@expressApp/controllers/testDrive/listDriversController";
import {paginatedRequest} from "@expressApp/requests/paginatedRequest";
import {patchDriverController} from "@expressApp/controllers/testDrive/patchDriverController";
import {patchDriverRequest} from "@expressApp/requests/patchDriverRequest";
import {listDriversIncidentsController} from "@expressApp/controllers/testDrive/listDriversIncidentsController";
import {paginatedWithDriverLicenseIdRequest} from "@expressApp/requests/paginatedWithDriverLicenseIdRequest";
import {listDriverTestsDrivesController} from "@expressApp/controllers/testDrive/listDriverTestsDrivesController";
import {registerTestDriveController} from "@expressApp/controllers/testDrive/registerTestDriveController";
import {registerTestDriveRequest} from "@expressApp/requests/registerTestDriveRequest";
import {registerIncidentController} from "@expressApp/controllers/testDrive/registerIncidentController";
import {registerIncidentRequest} from "@expressApp/requests/registerIncidentRequest";
import { registerCustomerController } from "./controllers/maintenance/registerCustomerController";
import { registerCustomerRequest } from "./requests/maintenance/registerCustomerRequest";
import { unregisterCustomerController } from "./controllers/maintenance/unregisterCustomerController";
import { showCustomerController } from "./controllers/maintenance/showCustomerController";
import { customerIdRequest } from "./requests/maintenance/customerIdRequest";


const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

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

get('/customers/:customerId', showCustomerController, customerIdRequest);
post('/customers', registerCustomerController, registerCustomerRequest);
del('/customers/:customerId', unregisterCustomerController, customerIdRequest);