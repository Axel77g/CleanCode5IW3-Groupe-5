import {OptionalResult, PaginatedResult, VoidResult} from "@shared/Result";
import {VehiculeBreakdown} from "@domain/maintenance/entities/VehiculeBreakdown";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {PaginatedInput} from "@shared/PaginatedInput";

export interface VehiculeBreakdownRepository {
    store(breakdown: VehiculeBreakdown): Promise<VoidResult>
    getBreakdownByVehicule(vehiculeBreakdownId: string): Promise<OptionalResult<VehiculeBreakdown>>
    listVehiculeBreakdowns(vehiculeImmatriculation: VehiculeImmatriculation, pagination: PaginatedInput): Promise<PaginatedResult<VehiculeBreakdown>>
}