import {IncidentsProjection} from "@application/testDrive/projections/IncidentsProjection";
import {incidentRepository} from "@expressApp/repositories/testDrive/incidentRepository";
export const incidentsProjection = new IncidentsProjection(incidentRepository)