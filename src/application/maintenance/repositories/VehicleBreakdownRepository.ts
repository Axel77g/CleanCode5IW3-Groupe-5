import {OptionalResult, PaginatedResult, VoidResult} from "@shared/Result";
import {VehicleBreakdown} from "@domain/maintenance/entities/VehicleBreakdown";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {PaginatedInput} from "@shared/PaginatedInput";

export interface VehicleBreakdownRepository {
    store(breakdown: VehicleBreakdown): Promise<VoidResult>
    getBreakdownById(vehicleBreakdownId: string): Promise<OptionalResult<VehicleBreakdown>>
    listVehicleBreakdowns(vehicleImmatriculation: VehicleImmatriculation, pagination: PaginatedInput): Promise<PaginatedResult<VehicleBreakdown>>
}