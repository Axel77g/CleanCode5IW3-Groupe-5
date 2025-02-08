import {Command} from "@application/commands/Command";
import {
    createRemindMaintenanceVehicleUseCase
} from "@application/maintenance/usecases/vehicle/RemindMaintenanceVehicleUseCase";
import {vehicleRepository} from "@infrastructureCore/repositories/maintenance/vehicleRepository";
import {notificationServices} from "@infrastructureCore/services/notificationServices";

export class RemindVehicleMaintenanceCommand extends Command {
    name: string = "RemindVehicleMaintenanceCommand";
    async execute() {
        const useCase = createRemindMaintenanceVehicleUseCase(vehicleRepository, notificationServices);
        const response = await useCase(undefined);
        if(response.success) console.log(response.value)
        else console.error(response.error)
    }
}