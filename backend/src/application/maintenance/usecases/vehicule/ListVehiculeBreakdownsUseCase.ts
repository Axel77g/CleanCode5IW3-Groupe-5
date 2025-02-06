import {PaginatedInput} from "@shared/PaginatedInput";
import {IUseCase} from "@shared/IUseCase";
import {PaginatedResult, Result} from "@shared/Result";
import {VehiculeBreakdown} from "@domain/maintenance/entities/VehiculeBreakdown";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {VehiculeBreakdownRepository} from "@application/maintenance/repositories/VehiculeBreakdownRepository";
import {VehiculeRepository} from "@application/maintenance/repositories/VehiculeRepository";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";

interface ListVehiculeBreakdownsInput extends PaginatedInput{
    immatriculation: VehiculeImmatriculation
}

export type ListVehiculeBreakdownsUseCase = IUseCase<ListVehiculeBreakdownsInput, PaginatedResult<VehiculeBreakdown>>

const ListVehiculeBreakdownErrors = {
    VEHICULE_NOT_FOUND : NotFoundEntityException.create("Vehicule not found"),
    CANNOT_LIST_VEHICULE_BREAKDOWNS: new ApplicationException("ListVehiculeBreakdowns.CannotListVehiculeBreakdowns", "Cannot list breakdowns")
}

export const createListVehiculeBreakdownsUseCase = (_vehiculeBreakdownRepository : VehiculeBreakdownRepository, _vehiculeRepository : VehiculeRepository): ListVehiculeBreakdownsUseCase => {
    return async (input : ListVehiculeBreakdownsInput) => {
        const vehiculeResponse = await _vehiculeRepository.getByImmatriculation(input.immatriculation)
        if(!vehiculeResponse.success) return vehiculeResponse
        if(vehiculeResponse.empty) return Result.Failure(ListVehiculeBreakdownErrors.VEHICULE_NOT_FOUND)
        const breakdownsResponse = await _vehiculeBreakdownRepository.listVehiculeBreakdowns(input.immatriculation, input)
        if(!breakdownsResponse.success) return Result.Failure(ListVehiculeBreakdownErrors.CANNOT_LIST_VEHICULE_BREAKDOWNS)
        return breakdownsResponse
    }
}
