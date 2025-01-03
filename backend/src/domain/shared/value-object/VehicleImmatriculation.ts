export class VehicleImmatriculation {
    private readonly immatriculation: string
    constructor(immatriculation: string) {
        this.immatriculation = immatriculation;
        if(!this.validate()) {
            throw new Error("Invalid immatriculation");
        }
    }

    public validate(): boolean
    {
        const regex = new RegExp("^[A-Z]{2}[0-9]{3}[A-Z]{2}$");
        return regex.test(this.immatriculation);
    }
}