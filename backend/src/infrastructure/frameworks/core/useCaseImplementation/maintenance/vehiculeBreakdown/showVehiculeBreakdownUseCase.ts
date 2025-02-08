import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {createShowVehiculeBreakdownUseCase,ShowVehiculeBreakdownUseCase} from "@application/maintenance/usecases/vehiculeBreakdown/ShowVehiculeBreakdownUseCase";
import {vehiculeBreakdownRepository} from "@infrastructureCore/repositories/maintenance/vehiculeBreakdownRepository";
import {showVehiculeBreakdownRequest} from "@infrastructureCore/requests/maintenance/vehiculeBreakdown/showVehiculeBreakdownRequest";

export const showVehiculeBreakdownUseCase : UseCaseImplementation<typeof showVehiculeBreakdownRequest, ShowVehiculeBreakdownUseCase> = async (input) => {
    const useCase = createShowVehiculeBreakdownUseCase(vehiculeBreakdownRepository)
    return useCase(input)
}