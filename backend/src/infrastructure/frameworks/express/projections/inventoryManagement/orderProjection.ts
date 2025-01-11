import {OrderProjection} from "@application/inventoryManagement/projections/OrderProjection";
import {orderRepository} from "@expressApp/repositories/inventoryManagement/orderRepository";

export const orderProjection = new OrderProjection(orderRepository)