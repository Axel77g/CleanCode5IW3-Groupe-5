import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {VehiculeBreakdownRepository} from "@application/maintenance/repositories/VehiculeBreakdownRepository";
import {VehiculeBreakdown} from "@domain/maintenance/entities/VehiculeBreakdown";

interface ShowVehiculeBreakdownInput extends IInputUseCase {
    vehiculeBreakdownId: string,
}

type ShowVehiculeBreakdownResult = Result<VehiculeBreakdown>
export type ShowVehiculeBreakdownUseCase = IUseCase<ShowVehiculeBreakdownInput, ShowVehiculeBreakdownResult>

export const createShowVehiculeBreakdownUseCase = (_vehiculeBreakdownRepository: VehiculeBreakdownRepository): ShowVehiculeBreakdownUseCase => {
    return async (input: ShowVehiculeBreakdownInput) => {
        const findResponse = await _vehiculeBreakdownRepository.getBreakdownById(input.vehiculeBreakdownId);
        if(!findResponse.success) return findResponse
        if(findResponse.empty) return Result.FailureStr("Breakdown not found")
        return findResponse
    }
}

