import {ApplicationException} from "@shared/ApplicationException";

export class VehiculeVin {
    static errors = {
        VIN_NOT_VALID: new ApplicationException("VehiculeVin.NotValid", "The vin is not valid format")
    }

    private constructor (private value: string) {}

    isValid(): boolean {
        const vinValidRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
        return vinValidRegex.test(this.value);
    }

    getValue(): string {
        return this.value;
    }

    static create(vin: string) {
        const vinObject = new VehiculeVin(vin);
        if (vinObject.isValid()) {
            return vinObject;
        }
        return VehiculeVin.errors.VIN_NOT_VALID;
    }
}