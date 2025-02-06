import { ApplicationException } from "@shared/ApplicationException";

export class VehiculeImmatriculation {
    static errors = {
        NOT_VALID: new ApplicationException("VehiculeImmatriculation.NotValid", "Vehicle immatriculation is not valid")
    }

    private readonly value: string
    private constructor(immatriculation: string) {
        this.value = immatriculation;
    }

    public getValue(): string {
        return this.value;
    }

    public validate(): boolean {
        const regex = new RegExp("^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$");
        return regex.test(this.value);
    }

    public static create(matriculation: string): VehiculeImmatriculation | ApplicationException {
        const vehicleImmatriculation = new VehiculeImmatriculation(matriculation);
        if (!vehicleImmatriculation.validate())
            return VehiculeImmatriculation.errors.NOT_VALID;
        return vehicleImmatriculation;
    }
}
