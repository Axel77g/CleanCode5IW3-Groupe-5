import {ApplicationException} from "@shared/ApplicationException";
import {assertError, generateStockInventorySparePart} from "@tests/Utils";
import {
    StockInventorySparePart,
    StockInventorySparePartAction
} from "@domain/inventoryManagement/value-object/StockInventorySparePart";

describe("StockInventorySparePart", () => {
    describe("create", () => {
        it("should create a valid StockInventorySparePart", () => {
            const payload = generateStockInventorySparePart();
            const stock = StockInventorySparePart.create(payload);
            expect(stock).toBeInstanceOf(StockInventorySparePart);
            expect(stock).toEqual(
                expect.objectContaining({
                    siret: payload.siret,
                    sparePartReference: payload.sparePartReference,
                    quantity: payload.quantity,
                })
            );
        });

        it("should return an ApplicationException if quantity is negative", () => {
            const payload = generateStockInventorySparePart({ quantity: -5 });
            const stock = StockInventorySparePart.create(payload);
            expect(stock).toBeInstanceOf(ApplicationException);
            assertError(
                stock as ApplicationException,
                StockInventorySparePart.errors.QUANTITY_NEGATIVE
            );
        });
    });

    describe("add", () => {
        it("should correctly add quantity to the stock", () => {
            const payload = generateStockInventorySparePart();
            const stock = StockInventorySparePart.create(payload) as StockInventorySparePart;

            const result = stock.add(5);
            expect(result.stock.quantity).toBe(payload.quantity + 5);
            expect(result.event.payload).toEqual(
                expect.objectContaining({
                    sparePartReference: payload.sparePartReference,
                    siret: payload.siret.getValue(),
                    quantity: 5,
                })
            );
        });
    });

    describe("remove", () => {
        it("should correctly remove quantity from the stock", () => {
            const payload = generateStockInventorySparePart({ quantity: 10 });
            const stock = StockInventorySparePart.create(payload) as StockInventorySparePart;

            const result = stock.remove(5) as StockInventorySparePartAction;

            expect(result.stock.quantity).toBe(payload.quantity - 5);
            expect(result.event.payload).toEqual(
                expect.objectContaining({
                    sparePartReference: payload.sparePartReference,
                    siret: payload.siret.getValue(),
                    quantity: -5,
                })
            );
        });

        it("should return an ApplicationException if quantity to remove exceeds stock", () => {
            const payload = generateStockInventorySparePart({ quantity: 5 });
            const stock = StockInventorySparePart.create(payload) as StockInventorySparePart;

            const result = stock.remove(10);
            expect(result).toBeInstanceOf(ApplicationException);
            assertError(
                result as ApplicationException,
                StockInventorySparePart.errors.RUN_OUT
            );
        });
    });

    describe("needToNotifyLowStock", () => {
        it("should return true if stock quantity is 5 or less", () => {
            const payload = generateStockInventorySparePart({ quantity: 5 });
            const stock = StockInventorySparePart.create(payload) as StockInventorySparePart;
            expect(stock.needToNotifyLowStock()).toBe(true);
        });

        it("should return false if stock quantity is greater than 5", () => {
            const payload = generateStockInventorySparePart({ quantity: 10 });
            const stock = StockInventorySparePart.create(payload) as StockInventorySparePart;
            expect(stock.needToNotifyLowStock()).toBe(false);
        });
    });
});