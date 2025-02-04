import { VehiculeProjection } from "@application/maintenance/projections/VehiculeProjection";
import {vehiculeRepository} from "@infrastructureCore/repositories/maintenance/vehiculeRepository";

export const vehiculeProjection = new VehiculeProjection(vehiculeRepository);