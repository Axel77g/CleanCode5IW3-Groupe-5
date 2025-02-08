import {OrderProjection} from "@application/inventoryManagement/projections/OrderProjection";
import {orderRepository} from "@infrastructureCore/repositories/inventoryManagement/orderRepository";

export const orderProjection = new OrderProjection(orderRepository)