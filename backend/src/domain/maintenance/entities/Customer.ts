import { VehicleImmatriculation } from "../../shared/value-object/VehicleImmatriculation";
import { CustomerAddress } from "../value-object/CustomerAddress";


export class Customer {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly phoneNumber: string,
        public readonly email: string,
        public readonly vehiculeImmatrictulation: VehicleImmatriculation,
        public readonly address: CustomerAddress,
    ) { }
}