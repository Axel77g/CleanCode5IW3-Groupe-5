export class NotValidVehicleImmatriculation extends Error {
    constructor() {
        super("Vehicle immatriculation is not valid");
    }
}