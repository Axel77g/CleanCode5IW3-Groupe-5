import {DriversProjection} from "@application/testDrive/projections/DriversProjection";
import {driverRepository} from "@expressApp/repositories/testDrive/driverRepository";
export const driverProjection = new DriversProjection(driverRepository)