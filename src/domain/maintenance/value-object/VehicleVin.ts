import {ApplicationException} from "@shared/ApplicationException";

export class VehicleVin {
    static errors = {
        VIN_NOT_VALID: new ApplicationException("VehicleVin.NotValid", "The vin is not valid format")
    }
    private constructor(private value: string) {}

    isValid(): boolean {
        const vinValidRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
        return vinValidRegex.test(this.value);
    }

    getValue(): string {
        return this.value;
    }

    static create(vin : string){
        const vinObject = new VehicleVin(vin);
        if(vinObject.isValid()){
            return vinObject;
        }
        return VehicleVin.errors.VIN_NOT_VALID;
    }
}