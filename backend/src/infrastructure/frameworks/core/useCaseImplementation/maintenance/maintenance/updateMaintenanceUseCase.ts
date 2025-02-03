// import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
// import {updateMaintenanceRequest} from "@infrastructureCore/requests/maintenance/maintenance/updateMaintenanceRequest";
// import {
//     createUpdateMaintenanceUseCase,
//     UpdateMaintenanceUseCase
// } from "@application/maintenance/usecases/maintenance/UpdateMaintenanceUseCase";
// import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
// import {maintenanceRepository} from "@infrastructureCore/repositories/maintenance/maintenanceRepository";
//
//
//
// export const updateMaintenanceUseCase : UseCaseImplementation<typeof updateMaintenanceRequest, UpdateMaintenanceUseCase> = async (input) => {
//     const useCase = createUpdateMaintenanceUseCase(maintenanceEventRepository, maintenanceRepository)
//     return useCase(input)
// }