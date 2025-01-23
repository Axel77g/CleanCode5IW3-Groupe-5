import { ApplicationException } from "@shared/ApplicationException";

export interface VehiculeVinDTO {
    vin: string;
}

export class VehiculeVin {

    static errors = {
        VIN_NOT_VALID: new ApplicationException('VehiculeVin.notValidVin', 'The VIN is not valid')
    }

    private constructor(
        public readonly vin: string,
    ) { }

    public validate(): boolean {
        const regex = new RegExp("^[A-HJ-NPR-Z0-9]{17}$");
        return regex.test(this.vin);
    }

    static create(payload: VehiculeVinDTO): VehiculeVin | Error {
        const vin = new VehiculeVin(payload.vin);
        if (!vin.validate()) return VehiculeVin.errors.VIN_NOT_VALID;
        return vin;
    }
}