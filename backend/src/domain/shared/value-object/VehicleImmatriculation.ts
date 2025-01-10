import {ApplicationException} from "@shared/ApplicationException";

export class VehicleImmatriculation {
    static errors = {
        NOT_VALID: new ApplicationException("VehicleImmatriculation.NotValid", "Vehicle immatriculation is not valid")
    }

    private readonly value: string
    private constructor(immatriculation: string) {
        this.value = immatriculation;
    }

    public getValue(): string {
        return this.value;
    }

    public validate(): boolean
    {
        const regex = new RegExp("^[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}$");
        return regex.test(this.value);
    }

    public static create(immatriculation: string): VehicleImmatriculation | ApplicationException {
        const vehicleImmatriculation = new VehicleImmatriculation(immatriculation);
        if(!vehicleImmatriculation.validate())
            return VehicleImmatriculation.errors.NOT_VALID;
        return vehicleImmatriculation;
    }
}
