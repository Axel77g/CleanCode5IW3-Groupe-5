import {IUseCase} from "@shared/IUseCase";
import {VehicleRepository} from "@application/maintenance/repositories/VehicleRepository";
import {Result} from "@shared/Result";
import {NotificationServices} from "@application/shared/services/NotificationServices";


export type RemindMaintenanceVehicleUseCase = IUseCase<undefined, Result>

export const createRemindMaintenanceVehicleUseCase = (_vehicleRepository: VehicleRepository, _maintenanceNotificationService : NotificationServices): RemindMaintenanceVehicleUseCase => {
    return async () => {
        const vehiclesToReminds = await _vehicleRepository.getVehicleNeedForMaintenance()
        if(!vehiclesToReminds.success) return vehiclesToReminds
        if(vehiclesToReminds.empty) return Result.Success("no vehicle need maintenance");
        const jobs = vehiclesToReminds.value.map((vehicle) => _maintenanceNotificationService.notifyMaintenance(vehicle))
        await Promise.all(jobs)
        return Result.Success("maintenance reminder sent")
    }
}