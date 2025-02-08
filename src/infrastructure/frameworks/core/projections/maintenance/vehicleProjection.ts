import { VehicleProjection } from "@application/maintenance/projections/VehicleProjection";
import {vehicleRepository} from "@infrastructureCore/repositories/maintenance/vehicleRepository";

export const vehicleProjection = new VehicleProjection(vehicleRepository);