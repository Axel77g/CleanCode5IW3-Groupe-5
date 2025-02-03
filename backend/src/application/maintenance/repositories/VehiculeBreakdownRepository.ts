import {OptionalResult, VoidResult} from "@shared/Result";
import {VehiculeBreakdown} from "@domain/maintenance/entities/VehiculeBreakdown";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";

export interface VehiculeBreakdownRepository {
    findById(vehiculeBreakdownId: string): Promise<OptionalResult<VehiculeBreakdown>>
    store(breakdown: VehiculeBreakdown): Promise<VoidResult>
    getBreakdownByVehicule(vehiculeImmatriculation: VehiculeImmatriculation): Promise<OptionalResult<VehiculeBreakdown>>
}