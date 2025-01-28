import {createListDriversUseCase, ListDriversUseCase} from "@application/testDrive/usecases/driver/ListDriversUseCase";
import {paginatedRequest} from "@infrastructureCore/requests/paginatedRequest";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";

export const listDriversUseCase : UseCaseImplementation<typeof paginatedRequest, ListDriversUseCase> = async (input) => {
    const useCase = createListDriversUseCase(driverRepository)
    return useCase(input)
}