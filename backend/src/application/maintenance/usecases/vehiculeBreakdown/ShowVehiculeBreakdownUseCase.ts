import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {Result} from "@shared/Result";
import {VehiculeBreakdownRepository} from "@application/maintenance/repositories/VehiculeBreakdownRepository";
import {VehiculeBreakdown} from "@domain/maintenance/entities/VehiculeBreakdown";

interface ShowVehiculeBreakdownInput extends IInputUseCase {
    vehiculeImmatriculation: VehiculeImmatriculation,
}

type ShowVehiculeBreakdownResult = Result<VehiculeBreakdown>
export type ShowVehiculeBreakdownUseCase = IUseCase<ShowVehiculeBreakdownInput, ShowVehiculeBreakdownResult>

export const createShowVehiculeBreakdownUseCase = (_vehiculeBreakdownRepository: VehiculeBreakdownRepository): ShowVehiculeBreakdownUseCase => {
    return async (input: ShowVehiculeBreakdownInput) => {
        const findResponse = await _vehiculeBreakdownRepository.getBreakdownByVehicule(input.vehiculeImmatriculation);
        if(!findResponse.success) return findResponse
        if(findResponse.empty) return Result.FailureStr("Breakdown not found")
        return findResponse
    }
}

