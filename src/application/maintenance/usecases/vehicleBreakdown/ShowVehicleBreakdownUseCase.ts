import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {VehicleBreakdownRepository} from "@application/maintenance/repositories/VehicleBreakdownRepository";
import {VehicleBreakdown} from "@domain/maintenance/entities/VehicleBreakdown";

interface ShowVehicleBreakdownInput extends IInputUseCase {
    vehicleBreakdownId: string,
}

type ShowVehicleBreakdownResult = Result<VehicleBreakdown>
export type ShowVehicleBreakdownUseCase = IUseCase<ShowVehicleBreakdownInput, ShowVehicleBreakdownResult>

export const createShowVehicleBreakdownUseCase = (_vehicleBreakdownRepository: VehicleBreakdownRepository): ShowVehicleBreakdownUseCase => {
    return async (input: ShowVehicleBreakdownInput) => {
        const findResponse = await _vehicleBreakdownRepository.getBreakdownById(input.vehicleBreakdownId);
        if(!findResponse.success) return findResponse
        if(findResponse.empty) return Result.FailureStr("Breakdown not found")
        return findResponse
    }
}

