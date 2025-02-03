import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {immatriculationRequest} from "@infrastructureCore/requests/maintenance/vehicule/vehiculeImmatriculationRequest";
import {
    createShowVehiculeUseCase,
    ShowVehiculeUseCase
} from "@application/maintenance/usecases/vehicule/ShowVehiculeUseCase";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {vehiculeRepository} from "@infrastructureCore/repositories/maintenance/vehiculeRepository";
import {Result} from "@shared/Result";

export const showVehiculeUseCase : UseCaseImplementation<typeof immatriculationRequest, ShowVehiculeUseCase> = async (input) => {
    const vehiculeImmatriculation = VehiculeImmatriculation.create(input.immatriculation)
    if(vehiculeImmatriculation instanceof Error) return Result.Failure(vehiculeImmatriculation)
    const useCase = createShowVehiculeUseCase(vehiculeRepository)
    return useCase({immatriculation: vehiculeImmatriculation})
}