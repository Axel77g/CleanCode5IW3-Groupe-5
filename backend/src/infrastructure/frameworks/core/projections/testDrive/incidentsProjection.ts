import {IncidentsProjection} from "@application/testDrive/projections/IncidentsProjection";
import {incidentRepository} from "@infrastructureCore/repositories/testDrive/incidentRepository";
export const incidentsProjection = new IncidentsProjection(incidentRepository)