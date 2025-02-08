import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {createShowVehicleBreakdownUseCase,ShowVehicleBreakdownUseCase} from "@application/maintenance/usecases/vehicleBreakdown/ShowVehicleBreakdownUseCase";
import {vehicleBreakdownRepository} from "@infrastructureCore/repositories/maintenance/vehicleBreakdownRepository";
import {showVehicleBreakdownRequest} from "@infrastructureCore/requests/maintenance/vehicleBreakdown/showVehicleBreakdownRequest";

export const showVehicleBreakdownUseCase : UseCaseImplementation<typeof showVehicleBreakdownRequest, ShowVehicleBreakdownUseCase> = async (input) => {
    const useCase = createShowVehicleBreakdownUseCase(vehicleBreakdownRepository)
    return useCase(input)
}