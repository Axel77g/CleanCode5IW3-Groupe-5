import {Command} from "@application/commands/Command";
import {
    createRemindMaintenanceVehiculeUseCase
} from "@application/maintenance/usecases/vehicule/RemindMaintenanceVehiculeUseCase";
import {vehiculeRepository} from "@infrastructureCore/repositories/maintenance/vehiculeRepository";
import {notificationServices} from "@infrastructureCore/services/notificationServices";

export class RemindVehiculeMaintenanceCommand extends Command {
    name: string = "RemindVehiculeMaintenanceCommand";
    async execute() {
        const useCase = createRemindMaintenanceVehiculeUseCase(vehiculeRepository, notificationServices);
        const response = await useCase(undefined);
        if(response.success) console.log(response.value)
        else console.error(response.error)
    }
}