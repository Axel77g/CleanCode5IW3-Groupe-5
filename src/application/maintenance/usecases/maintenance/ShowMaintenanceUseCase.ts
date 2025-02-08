import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {Maintenance} from "@domain/maintenance/entities/Maintenance";
import {MaintenanceRepository} from "@application/maintenance/repositories/MaintenanceRepository";
import {NotFoundEntityException} from "@shared/ApplicationException";

interface ShowMaintenanceInput extends IInputUseCase {
    maintenanceId: string
}

type ShowMaintenanceResult = Result<Maintenance>
export type ShowMaintenanceUseCase = IUseCase<ShowMaintenanceInput, ShowMaintenanceResult>

export const createShowMaintenanceUseCase = (_maintenanceRepository: MaintenanceRepository): ShowMaintenanceUseCase => {
    return async (input: ShowMaintenanceInput) => {
        const findResponse = await _maintenanceRepository.getByMaintenanceId(input.maintenanceId);
        if (!findResponse.success) return findResponse
        if (findResponse.empty) return Result.Failure(NotFoundEntityException.create("Maintenance not found"))
        return findResponse
    }
}
