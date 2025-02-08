"use server"

import {
    listVehicleMaintenanceUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicle/listVehicleMaintenanceUseCase";
import {ErrorCallout} from "@/components/ErrorCallout";
import {useServerPagination} from "@/hooks/useServerPagination";
import ListItem from "@/components/ListItem";
import Chip from "@/components/Chip";
import Pagination from "@/components/Pagination";
import HeadingTile from "@/components/HeadingTitle";


export default async function VehicleMaintenancesPage(pageProps: { params: any, searchParams: any }) {
    const {immatriculation} = await pageProps.params as { immatriculation: string }
    const paginationQuery = await useServerPagination(pageProps)
    const result = await listVehicleMaintenanceUseCase({immatriculation, ...paginationQuery})
    if (!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const {
        value, ...pagination
    } = result
    return (
        <div>
            <HeadingTile>Liste des maintenances du véhicule <span className="text-gray-500">({immatriculation})</span></HeadingTile>
            <div>
                {value.map(maintenance => (
                    <ListItem key={maintenance.maintenanceId} link={`/maintenances/${maintenance.maintenanceId}`}>
                        <Chip>{maintenance.maintenanceId}</Chip>
                        <span className={"font-bold"}>({maintenance.vehicleImmatriculation.getValue()})</span>
                        - {maintenance.date.toLocaleDateString() + " "}
                        - Prix total : {maintenance.totalPrice.getFormattedValue()}
                    </ListItem>
                ))}
            </div>

            <Pagination {...pagination}/>
        </div>
    )
}