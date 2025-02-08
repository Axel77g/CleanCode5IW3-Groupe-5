import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {paginatedRequest} from "@infrastructureCore/requests/paginatedRequest";
import {
    createListDealerUseCase,
    ListDealerUseCase
} from "@application/inventoryManagement/usecases/dealer/listDealerUseCase";
import {dealerRepository} from "@infrastructureCore/repositories/inventoryManagement/dealerRepository";

export const listDealersUseCase : UseCaseImplementation<typeof paginatedRequest, ListDealerUseCase> = async (input) =>{
    const useCase = createListDealerUseCase(dealerRepository)
    return useCase(input)
}