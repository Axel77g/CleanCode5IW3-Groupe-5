import {IUseCase} from "@shared/IUseCase";
import {VehiculeRepository} from "@application/maintenance/repositories/VehiculeRepository";
import {Result} from "@shared/Result";
import {NotificationServices} from "@application/shared/services/NotificationServices";



export type RemindMaintenanceVehiculeUseCase = IUseCase<undefined, Result>



export const createRemindMaintenanceVehiculeUseCase = (_vehiculeRepository: VehiculeRepository, _maintenanceNotificationService : NotificationServices): RemindMaintenanceVehiculeUseCase => {
    return async () => {
        const vehiclesToReminds = await _vehiculeRepository.getVehiculeNeedForMaintenance()
        if(!vehiclesToReminds.success) return vehiclesToReminds
        if(vehiclesToReminds.empty) return Result.Success("no vehicule need maintenance");
        const jobs = vehiclesToReminds.value.map((vehicle) => _maintenanceNotificationService.notifyMaintenance(vehicle))
        await Promise.all(jobs)
        return Result.Success("maintenance reminder sent")
    }
}