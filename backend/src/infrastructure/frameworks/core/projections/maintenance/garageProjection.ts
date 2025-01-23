import { GarageProjection } from "@application/maintenance/projections/GarageProjection";
import { garageRepository } from "@infrastructureCore/repositories/maintenance/garageRepository";

export const garageProjection = new GarageProjection(garageRepository);