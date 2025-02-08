import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {immatriculationRequest} from "@infrastructureCore/requests/maintenance/vehicle/vehicleImmatriculationRequest";
import {
    createShowVehicleUseCase,
    ShowVehicleUseCase
} from "@application/maintenance/usecases/vehicle/ShowVehicleUseCase";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {vehicleRepository} from "@infrastructureCore/repositories/maintenance/vehicleRepository";
import {Result} from "@shared/Result";

export const showVehicleUseCase : UseCaseImplementation<typeof immatriculationRequest, ShowVehicleUseCase> = async (input) => {
    const vehicleImmatriculation = VehicleImmatriculation.create(input.immatriculation)
    if(vehicleImmatriculation instanceof Error) return Result.Failure(vehicleImmatriculation)
    const useCase = createShowVehicleUseCase(vehicleRepository)
    return useCase({immatriculation: vehicleImmatriculation})
}