import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {Siret} from "@domain/shared/value-object/Siret";
import {siretRequest} from "@infrastructureCore/requests/inventoryManagement/siretRequest";
import {
    createShowDealerUseCase,
    ShowDealerUseCase
} from "@application/inventoryManagement/usecases/dealer/ShowDealerUseCase";
import {dealerRepository} from "@infrastructureCore/repositories/inventoryManagement/dealerRepository";
import {Result} from "@shared/Result";
import {ApplicationException} from "@shared/ApplicationException";

export const showDealerUseCase : UseCaseImplementation<typeof siretRequest, ShowDealerUseCase> = async (input) => {
    const siret = Siret.create(input.siret)
    if(siret instanceof ApplicationException) return Result.Failure(siret)
    const useCase = createShowDealerUseCase(dealerRepository)
    return useCase({siret})
}