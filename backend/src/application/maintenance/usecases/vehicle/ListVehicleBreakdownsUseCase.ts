import {PaginatedInput} from "@shared/PaginatedInput";
import {IUseCase} from "@shared/IUseCase";
import {PaginatedResult, Result} from "@shared/Result";
import {VehicleBreakdown} from "@domain/maintenance/entities/VehicleBreakdown";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {VehicleBreakdownRepository} from "@application/maintenance/repositories/VehicleBreakdownRepository";
import {VehicleRepository} from "@application/maintenance/repositories/VehicleRepository";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";

interface ListVehicleBreakdownsInput extends PaginatedInput{
    immatriculation: VehicleImmatriculation
}

export type ListVehicleBreakdownsUseCase = IUseCase<ListVehicleBreakdownsInput, PaginatedResult<VehicleBreakdown>>

const ListVehicleBreakdownErrors = {
    Vehicle_NOT_FOUND : NotFoundEntityException.create("Vehicle not found"),
    CANNOT_LIST_Vehicle_BREAKDOWNS: new ApplicationException("ListVehicleBreakdowns.CannotListVehicleBreakdowns", "Cannot list breakdowns")
}

export const createListVehicleBreakdownsUseCase = (_vehicleBreakdownRepository : VehicleBreakdownRepository, _vehicleRepository : VehicleRepository): ListVehicleBreakdownsUseCase => {
    return async (input : ListVehicleBreakdownsInput) => {
        const vehicleResponse = await _vehicleRepository.getByImmatriculation(input.immatriculation)
        if(!vehicleResponse.success) return vehicleResponse
        if(vehicleResponse.empty) return Result.Failure(ListVehicleBreakdownErrors.Vehicle_NOT_FOUND)
        const breakdownsResponse = await _vehicleBreakdownRepository.listVehicleBreakdowns(input.immatriculation, input)
        if(!breakdownsResponse.success) return Result.Failure(ListVehicleBreakdownErrors.CANNOT_LIST_Vehicle_BREAKDOWNS)
        return breakdownsResponse
    }
}
