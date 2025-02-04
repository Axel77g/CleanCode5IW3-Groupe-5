import {Garage} from "@domain/maintenance/entities/Garage";
import {PaginatedResult} from "@shared/Result";
import {IUseCase} from "@shared/IUseCase";
import {PaginatedInput} from "@shared/PaginatedInput";
import {GarageRepository} from "@application/maintenance/repositories/GarageRepository";

type ListGarageResult = PaginatedResult<Garage>
export type ListGarageUseCase = IUseCase<PaginatedInput, ListGarageResult>

export const createListGarageUseCase = (_garageRepository: GarageRepository): ListGarageUseCase => {
    return async (input: PaginatedInput) => {
        const findResponse = await _garageRepository.list(input);
        if (!findResponse.success) return findResponse
        return findResponse
    }
}