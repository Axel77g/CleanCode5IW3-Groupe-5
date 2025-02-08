import {OrderLine, OrderLineDTO} from "@domain/inventoryManagement/value-object/OrderLine";
import {assertError, generateOrderLineDTO} from "@tests/Utils";
import {ApplicationException} from "@shared/ApplicationException";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";

describe("OrderLine", () => {
    describe("create", () => {
        it("should create an OrderLine with valid data", () => {
            const dto: OrderLineDTO = generateOrderLineDTO();
            const orderLine = OrderLine.create(dto);
            expect(orderLine).toBeInstanceOf(OrderLine);
            expect(orderLine).toEqual(
                expect.objectContaining({
                    reference: dto.reference,
                    quantity: dto.quantity,
                    unitPrice: dto.unitPrice,
                })
            );
        });

        it("should return an ApplicationException when the reference is invalid", () => {
            const dto: OrderLineDTO = generateOrderLineDTO({ reference: "X" }); // Référence invalide
            const orderLine = OrderLine.create(dto);
            expect(orderLine).toBeInstanceOf(ApplicationException);
            assertError(orderLine as ApplicationException, InventorySparePart.errors.REFERENCE_TOO_SHORT);
        });

        it("should return an ApplicationException when quantity is <= 0", () => {
            const dto: OrderLineDTO = generateOrderLineDTO({ quantity: 0 }); // Quantité invalide
            const orderLine = OrderLine.create(dto);
            expect(orderLine).toBeInstanceOf(ApplicationException);
            assertError(orderLine as ApplicationException, OrderLine.errors.INVALID_QUANTITY);
        });
    });
});