import {BikeRepository} from "../repositories/BikeRepository";
import {Immatriculation} from "../../domain/value-objects/Immatriculation";

export class ShowBikeUseCase {
  constructor(private bikeRepository: BikeRepository) {}

  execute(immatriculation: Immatriculation) {
    return this.bikeRepository.show(immatriculation)
  }
}