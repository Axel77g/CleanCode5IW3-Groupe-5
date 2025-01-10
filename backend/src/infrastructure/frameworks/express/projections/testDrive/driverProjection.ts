import {DriversProjection} from "@application/testDrive/projections/DriversProjection";
import {driverRepository} from "@expressApp/repositories/testDrive/driverRepository";
import {eventObserver} from "@expressApp/observers/eventObserver";
export const driverProjection = new DriversProjection(driverRepository, eventObserver)
