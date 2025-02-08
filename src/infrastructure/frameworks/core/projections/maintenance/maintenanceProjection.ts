import {MaintenanceProjection} from "@application/maintenance/projections/MaintenanceProjection";
import {maintenanceRepository} from "@infrastructureCore/repositories/maintenance/maintenanceRepository";

export const maintenanceProjection = new MaintenanceProjection(maintenanceRepository);