import {useServerPagination} from "@/hooks/useServerPagination";
import HeadingTile from "@/components/HeadingTitle";
import MaintenanceForm from "@/app/maintenances/MaintenanceForm";
import Pagination from "@/components/Pagination";
import {
    listMaintenanceUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/maintenance/listMaintenanceUseCase";
import List from "@/components/List";
import ListItem from "@/components/ListItem";

export default async function MaintenancesPage(pageProps: {searchParams: any}) {
    const result = await listMaintenanceUseCase(await useServerPagination(pageProps))
    if(!result.success) return <div>{result.error.message}</div>
    const {value, ...pagination} = result
    return <div className={"flex flex-col gap-6"}>
        <HeadingTile>Liste des maintenances</HeadingTile>

        <List>
            {
                value.map(
                    (maintenance, index) =>
                        <ListItem key={index} link={`/maintenances/${maintenance.maintenanceId}`}>
                            <div>Maintenance véhicule : {maintenance.vehiculeImmatriculation.getValue()} - {maintenance.date.toLocaleDateString()}</div>
                        </ListItem>
                )
            }
        </List>

        <Pagination {...pagination} />
        <MaintenanceForm/>
    </div>
}