import {NotValidVehicleImmatriculation} from "../Errors/NotValidVehicleImmatriculation";

export class VehicleImmatriculation {
    private readonly immatriculation: string
    constructor(immatriculation: string) {
        this.immatriculation = immatriculation;

    }

    public getValue(): string {
        return this.immatriculation;
    }

    public validate(): boolean
    {
        const regex = new RegExp("^[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}$");
        return regex.test(this.immatriculation);
    }

    public static create(immatriculation: string): VehicleImmatriculation | Error {
        const vehicleImmatriculation = new VehicleImmatriculation(immatriculation);
        if(!vehicleImmatriculation.validate())
            return new NotValidVehicleImmatriculation();
        return vehicleImmatriculation;
    }
}