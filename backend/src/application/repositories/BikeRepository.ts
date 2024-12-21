import {Bike} from "../../domain/entities/Bike";
import {Immatriculation} from "../../domain/value-objects/Immatriculation";

export interface BikeRepository{
    index(): Promise<Bike[]>
    show(immatriculation: Immatriculation): Promise<Bike>
    store(bike: Bike): Promise<void>
    update(bike: Bike): Promise<void>
    delete(immatriculation: Immatriculation): Promise<void>
}