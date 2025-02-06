import {Garage} from "@domain/maintenance/entities/Garage";
import {PaginatedResult, Result} from "@shared/Result";
import {IUseCase} from "@shared/IUseCase";
import {PaginatedInput} from "@shared/PaginatedInput";
import {GarageRepository} from "@application/maintenance/repositories/GarageRepository";

type ListGarageResult = PaginatedResult<Garage>
export type ListGarageUseCase = IUseCase<PaginatedInput, ListGarageResult>

export const createListGarageUseCase = (_garageRepository: GarageRepository): ListGarageUseCase => {
    return async (input: PaginatedInput) => {
        const findResponse = await _garageRepository.listGarages(input);
        if (!findResponse.success) return Result.FailureStr("Cannot list garages")
        return findResponse
    }
}