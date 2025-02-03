import {VehiculeBreakdownProjection} from "@application/maintenance/projections/VehiculeBreakdownProjection";
import {vehiculeBreakdownRepository} from "@infrastructureCore/repositories/maintenance/vehiculeBreakdownRepository";

export const vehiculeBreakdownProjection = new VehiculeBreakdownProjection(vehiculeBreakdownRepository)