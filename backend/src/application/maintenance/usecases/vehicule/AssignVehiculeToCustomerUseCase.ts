// import {IInputUseCase, IUseCase} from "@shared/IUseCase";
// import {Result} from "@shared/Result";
// import {CustomerRepository} from "@application/maintenance/repositories/CustomerRepository";
// import {VehiculeRepository} from "@application/maintenance/repositories/VehiculeRepository";
// import {AssignVehiculeToCustomerEvent} from "@domain/maintenance/events/vehicule/AssignVehiculeToCustomerEvent";
//
// interface AssignVehiculeToCustomerInput extends IInputUseCase {
//     customerId: string,
//     immatriculation: string,
// }
//
// export type AssignVehiculeToCustomerUseCase = IUseCase<AssignVehiculeToCustomerInput, Result>
//
// export const createAssignVehiculeToCustomerUseCase = (_customerRepository: CustomerRepository, _vehiculeRepository: VehiculeRepository): AssignVehiculeToCustomerUseCase => {
//     return async (input: AssignVehiculeToCustomerInput) => {
//         const customerResponse = await _customerRepository.getCustomerById(input.customerId);
//         if (!customerResponse.success) return customerResponse
//         if (customerResponse.empty) return Result.FailureStr("Customer not found")
//
//         const immatriculationResponse = await _vehiculeRepository.getVehiculeByImmatriculation(input.immatriculation);
//         if (!immatriculationResponse.success) return immatriculationResponse
//         if (immatriculationResponse.empty) return Result.FailureStr("Vehicule not found")
//
//         const assignVehiculeToCustomerEvent = new AssignVehiculeToCustomerEvent({
//             customerId: input.customerId,
//             immatriculation: input.immatriculation
//         });
//     }
// }