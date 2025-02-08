import {VehicleBreakdownProjection} from "@application/maintenance/projections/VehicleBreakdownProjection";
import {vehicleBreakdownRepository} from "@infrastructureCore/repositories/maintenance/vehicleBreakdownRepository";

export const vehicleBreakdownProjection = new VehicleBreakdownProjection(vehicleBreakdownRepository)