import {assertError, generateOrderDTO, generateOrderLineDTOs, generateSiret} from "@tests/Utils";
import {ApplicationException} from "@shared/ApplicationException";
import {Order} from "@domain/inventoryManagement/entities/Order";
import {OrderStatusEnum} from "@domain/inventoryManagement/enums/OrderStatusEnum";
import {OrderLine} from "@domain/inventoryManagement/value-object/OrderLine";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";

describe("Order", () => {
    describe("create", () => {
        it("should create an Order with valid data", () => {
            const dto = generateOrderDTO();
            const order = Order.create({
                ...dto,
                siret: generateSiret(),
                lines : [OrderLine.create({reference: "123", quantity: 1, unitPrice: 100}) as OrderLine]
            });
            expect(order).toBeInstanceOf(Order);
        });

        it("should return an ApplicationException when orderedAt is after deliveredAt", () => {
            const dto = generateOrderDTO({
                orderedAt: new Date("2023-01-03"),
                deliveredAt: new Date("2023-01-01"),
            });
            const order = Order.create({
                ...dto,
                siret: generateSiret()
            });
            expect(order).toBeInstanceOf(ApplicationException);
            assertError(order as ApplicationException, Order.errors.INVALID_DATE);
        });

        it("should return an ApplicationException when no order lines are provided", () => {
            const dto = generateOrderDTO({ lines: [] });
            const order = Order.create({
                ...dto,
                siret: generateSiret(),
            });
            expect(order).toBeInstanceOf(ApplicationException);
            assertError(order as ApplicationException, Order.errors.NO_LINES);
        });
    });

    describe("fromObject", () => {
        it("should create an Order from a valid DTO", () => {
            const dto = generateOrderDTO();
            const order = Order.fromObject(dto);
            expect(order).toBeInstanceOf(Order);
        });

        it("should return an ApplicationException for an invalid SIRET", () => {
            const dto = generateOrderDTO({ siret: "INVALID_SIRET" });
            const order = Order.fromObject(dto);
            expect(order).toBeInstanceOf(ApplicationException);
        });

        it("should return an ApplicationException for an invalid OrderLine", () => {
            const dto = generateOrderDTO({
                lines: generateOrderLineDTOs(1, { reference: "" }), // Ligne invalide
            });
            const order = Order.fromObject(dto);
            expect(order).toBeInstanceOf(ApplicationException);
            assertError(order as ApplicationException, InventorySparePart.errors.REFERENCE_TOO_SHORT);
        });
    });

    describe("applyStatus", () => {
        it("should change the status to COMPLETED if applicable", () => {
            const dto = generateOrderDTO();
            const order = Order.fromObject(dto) as Order;
            const updatedOrder = order.applyStatus(OrderStatusEnum.COMPLETED);
            expect(updatedOrder).toBeInstanceOf(Order);
            expect((updatedOrder as Order).status).toBe(OrderStatusEnum.COMPLETED);
        });

        it("should return an ApplicationException if trying to COMPLETE a CANCELED order", () => {
            const dto = generateOrderDTO({ status: OrderStatusEnum.CANCELED });
            const order = Order.fromObject(dto) as Order;
            const result = order.applyStatus(OrderStatusEnum.COMPLETED);
            expect(result).toBeInstanceOf(ApplicationException);
            assertError(
                result as ApplicationException,
                Order.errors.CANNOT_COMPLETE_CANCELED_ORDER
            );
        });

        it("should return an ApplicationException if trying to CANCEL a COMPLETED order", () => {
            const dto = generateOrderDTO({ status: OrderStatusEnum.COMPLETED });
            const order = Order.fromObject(dto) as Order;
            const result = order.applyStatus(OrderStatusEnum.CANCELED);
            expect(result).toBeInstanceOf(ApplicationException);
            assertError(
                result as ApplicationException,
                Order.errors.CANNOT_CANCEL_COMPLETED_ORDER
            );
        });
    });

    describe("registerEvent", () => {
        it("should create a RegisterOrderEvent with the correct data", () => {
            const dto = generateOrderDTO();
            const order = Order.fromObject(dto) as Order;
            const event = order.registerEvent();
            expect(event).toBeDefined();
            expect(event.payload.orderId).toBe(order.orderId);
            expect(event.payload.lines).toBe(order.lines);
        });
    });

    describe("updateStatusEvent", () => {
        it("should create an UpdateOrderStatusEvent with the correct data", () => {
            const dto = generateOrderDTO();
            const order = Order.fromObject(dto) as Order;
            const event = order.updateStatusEvent();
            expect(event).toBeDefined();
            expect(event.payload.orderId).toBe(order.orderId);
            expect(event.payload.status).toBe(order.status);
        });
    });
});