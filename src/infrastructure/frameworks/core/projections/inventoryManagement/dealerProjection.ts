import {DealerProjection} from "@application/inventoryManagement/projections/DealerProjection";
import {dealerRepository} from "@infrastructureCore/repositories/inventoryManagement/dealerRepository";

export const dealerProjection =  new DealerProjection(dealerRepository)