import { Customer, CustomerDTO } from "@domain/maintenance/entities/Customer";
import { AddressDTO } from "@domain/shared/value-object/Address";
import { ApplicationException } from "@shared/ApplicationException";
import { RegisterCustomerEvent } from "../events/customer/RegisterCustomerEvent";
import { UnregisterCustomerEvent } from "../events/customer/UnregisterCustomerEvent";
import { UpdateCustomerEvent } from "../events/customer/UpdateCustomerEvent";

export const generateRandomString = (length = 10): string => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    while (result.length < length) {
        result += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return result;
};

export const generateRandomEmail = (): string => {
    return `${generateRandomString(5)}@example.com`;
};

export const generateAddressDTO = (overrides: Partial<AddressDTO> = {}): AddressDTO => {
    return {
        street: "123 Main St",
        city: "Paris",
        postalCode: "75001",
        country: "FR",
        ...overrides,
    };
};

export const generateCustomerDTO = (overrides: Partial<CustomerDTO> = {}): CustomerDTO => {
    return {
        customerId: generateRandomString(),
        name: generateRandomString(),
        phoneNumber: "123-456-7890",
        email: generateRandomEmail(),
        address: generateAddressDTO(),
        vehicleImmatriculations: [],
        ...overrides,
    };
};

export const assertError = (error: ApplicationException, expectedError: ApplicationException): void => {
    expect(error.equals(expectedError)).toBeTruthy();
};

describe("Customer Entity", () => {
    it("should create a Customer from a valid DTO", () => {
        const customerDTO = generateCustomerDTO();
        const result = Customer.fromObject(customerDTO);
        expect(result).not.toBeInstanceOf(ApplicationException);
        if (result instanceof Customer) {
            expect(result.customerId).toBe(customerDTO.customerId);
            expect(result.name).toBe(customerDTO.name);
            expect(result.phoneNumber).toBe(customerDTO.phoneNumber);
            expect(result.email).toBe(customerDTO.email);
            expect(result.address.street).toBe(customerDTO.address.street);
        }
    });

    it("should return an ApplicationException for invalid Address", () => {
        const customerDTO = generateCustomerDTO({ address: generateAddressDTO({ street: "" }) });
        const result = Customer.fromObject(customerDTO);
        expect(result).toBeInstanceOf(ApplicationException);
        if (result instanceof ApplicationException) {
            assertError(
                result,
                new ApplicationException("Address.notValidStreet", "The street n'est pas valide")
            );
        }
    });

    it("should create a RegisterCustomerEvent", () => {
        const customerDTO = generateCustomerDTO();
        const customer = Customer.fromObject(customerDTO);
        if (customer instanceof Customer) {
            const event = customer.registerEvent();
            expect(event).toBeInstanceOf(RegisterCustomerEvent);
            expect(event.payload.customerId).toBe(customerDTO.customerId);
        }
    });

    it("should create an UpdateCustomerEvent", () => {
        const customerDTO = generateCustomerDTO();
        const customer = Customer.fromObject(customerDTO);
        if (customer instanceof Customer) {
            const event = customer.updateCustomerEvent();
            expect(event).toBeInstanceOf(UpdateCustomerEvent);
            expect(event.payload.customerId).toBe(customerDTO.customerId);
        }
    });

    it("should create an UnregisterCustomerEvent", () => {
        const customerDTO = generateCustomerDTO();
        const customer = Customer.fromObject(customerDTO);
        if (customer instanceof Customer) {
            const event = customer.unregisterEvent();
            expect(event).toBeInstanceOf(UnregisterCustomerEvent);
            expect(event.payload.customerId).toBe(customerDTO.customerId);
        }
    });
});
