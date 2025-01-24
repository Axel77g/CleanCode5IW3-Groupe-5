import { InventorySparePart } from "./InventorySparePart";
import { ApplicationException } from "@shared/ApplicationException";
import {assertError, generateInventorySparePartDTO} from "@tests/Utils";

describe("InventorySparePart", () => {
    describe("create", () => {
        it("should create an InventorySparePart when provided with valid data", () => {
            const dto = generateInventorySparePartDTO();
            const sparePart = InventorySparePart.create(dto) as InventorySparePart;
            expect(sparePart).toBeInstanceOf(InventorySparePart);
            expect(sparePart.reference).toBe(dto.reference);
            expect(sparePart.name).toBe(dto.name);
        });

        it("should return an ApplicationException when name is too short", () => {
            const dto = generateInventorySparePartDTO({ name: "A" }); // Nom trop court
            const sparePart = InventorySparePart.create(dto) as ApplicationException;
            expect(sparePart).toBeInstanceOf(ApplicationException);
            assertError(sparePart, InventorySparePart.errors.NAME_TOO_SHORT)
        });

        it("should return an ApplicationException when reference is too short", () => {
            const dto = generateInventorySparePartDTO({ reference: "ABC" }); // Référence trop courte
            const sparePart = InventorySparePart.create(dto) as ApplicationException;
            expect(sparePart).toBeInstanceOf(ApplicationException);
            assertError(sparePart, InventorySparePart.errors.REFERENCE_TOO_SHORT)
        });
    });

    describe("fromObject", () => {
        it("should create an InventorySparePart from a valid DTO", () => {
            const dto = generateInventorySparePartDTO();
            const sparePart = InventorySparePart.fromObject(dto);
            expect(sparePart).toBeInstanceOf(InventorySparePart);
        });

        it("should return an ApplicationException for an invalid DTO", () => {
            const dto = generateInventorySparePartDTO({ reference: "123", name: "" }); // Référence et nom invalides
            const sparePart = InventorySparePart.fromObject(dto);
            expect(sparePart).toBeInstanceOf(ApplicationException);
        });
    });

    describe("setName", () => {
        it("should create a new InventorySparePart with an updated name", () => {
            const dto = generateInventorySparePartDTO();
            const sparePart = InventorySparePart.create(dto) as InventorySparePart;
            const updatedSparePart = sparePart.setName("Updated Name");
            expect(updatedSparePart).not.toBe(sparePart); // Nouvelle instance
            expect(updatedSparePart.name).toBe("Updated Name");
        });
    });

    describe("upsertEvent", () => {
        it("should create an UpsertInventorySparePartEvent with the correct data", () => {
            const dto = generateInventorySparePartDTO();
            const sparePart = InventorySparePart.create(dto) as InventorySparePart;
            const event = sparePart.upsertEvent();
            expect(event).toBeDefined();
            expect(event.payload.reference).toBe(sparePart.reference);
            expect(event.payload.name).toBe(sparePart.name);
        });
    });
});
