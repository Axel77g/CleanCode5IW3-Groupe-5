import {AddressDTO} from "@domain/shared/value-object/Address";
import {DealerDTO} from "@domain/inventoryManagement/entities/Dealer";
import {InventorySparePartDTO} from "@domain/inventoryManagement/entities/InventorySparePart";
import {ApplicationException} from "@shared/ApplicationException";
import {OrderDTO} from "@domain/inventoryManagement/entities/Order";
import {OrderLineDTO} from "@domain/inventoryManagement/value-object/OrderLine";
import {Siret} from "@domain/shared/value-object/Siret";
import {OrderStatusEnum} from "@domain/inventoryManagement/enums/OrderStatusEnum";

export const generateRandomString = (length = 10): string => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    while (result.length < length) {
        result += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return result;
}

export const generateRandomNumber = (min = 0, max = 100): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateSiret = (): Siret => {

    return Siret.create(generateRandomNumber(
        10000000000000,
        99999999999999
    ).toString(
    )) as Siret;
}

export const generateAddressDTO = (overrides: Partial<AddressDTO> = {}): AddressDTO => {
    return {
        street: "123 Main St",
        city: "Paris",
        postalCode: "75001",
        country: generateRandomString(2),
        ...overrides
    };
};

export const generateDealerDTO = (overrides: Partial<DealerDTO> = {}): DealerDTO => {
    return {
        siret: generateSiret().getValue(),
        name: "Test Dealer",
        address: generateAddressDTO(),
        phoneNumber: "0123456789",
        ...overrides
    };
};

export const generateInventorySparePartDTO = (
    overrides?: Partial<InventorySparePartDTO>
): InventorySparePartDTO => {
    return {
        reference: generateRandomString(10),
        name: generateRandomString(10),
        ...overrides,
    };
};

export const assertError = (error : ApplicationException, error2 : ApplicationException) =>{
    expect(error.equals(error2)).toBeTruthy()
}


export const generateOrderLineDTO = (
    overrides?: Partial<OrderLineDTO>
): OrderLineDTO => {
    return {
        reference: generateRandomString(10),
        quantity: 1,
        unitPrice: 100.0,
        ...overrides,
    };
};

export const generateOrderLineDTOs = (
    count = 1,
    overrides?: Partial<OrderLineDTO>
): OrderLineDTO[] => {
    return Array.from({ length: count }).map(() =>
        generateOrderLineDTO(overrides)
    );
};

export const generateOrderDTO = (
    overrides?: Partial<OrderDTO>
): OrderDTO => {
    return {
        orderId: "ORDER12345",
        orderedAt: new Date("2023-01-01"),
        deliveredAt: new Date("2023-01-02"),
        siret: generateSiret().getValue(),
        lines: generateOrderLineDTOs(2),
        status: OrderStatusEnum.PENDING,
        statusHistory: [],
        ...overrides,
    };
};

export const generateStockInventorySparePart = (
    overrides?: Partial<{ siret: Siret; sparePartReference: string; quantity: number }>
) => {
    return {
        siret: generateSiret(),
        sparePartReference: "VALID_REF",
        quantity: 10,
        ...overrides,
    };
};