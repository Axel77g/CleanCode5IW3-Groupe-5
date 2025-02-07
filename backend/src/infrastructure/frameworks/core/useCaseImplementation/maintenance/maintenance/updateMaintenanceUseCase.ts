// import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
// import {updateMaintenanceRequest} from "@infrastructureCore/requests/maintenances/maintenances/updateMaintenanceRequest";
// import {
//     createUpdateMaintenanceUseCase,
//     UpdateMaintenanceUseCase
// } from "@application/maintenances/usecases/maintenances/UpdateMaintenanceUseCase";
// import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenances/maintenanceEventRepository";
// import {maintenanceRepository} from "@infrastructureCore/repositories/maintenances/maintenanceRepository";
//
//
//
// export const updateMaintenanceUseCase : UseCaseImplementation<typeof updateMaintenanceRequest, UpdateMaintenanceUseCase> = async (input) => {
//     const useCase = createUpdateMaintenanceUseCase(maintenanceEventRepository, maintenanceRepository)
//     return useCase(input)
// }