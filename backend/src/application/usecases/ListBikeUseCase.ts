import {BikeRepository} from "../repositories/BikeRepository";


export class ListBikeUseCase {
  constructor(private bikeRepository: BikeRepository) {}

  execute() {
    return this.bikeRepository.index()
  }
}