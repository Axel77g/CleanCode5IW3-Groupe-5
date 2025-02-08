import {useServerPagination} from "@/hooks/useServerPagination";
import ListItem from "@/components/ListItem";
import List from "@/components/List";
import Chip from "@/components/Chip";
import {ErrorCallout} from "@/components/ErrorCallout";
import {
    listVehiclesBreakdownUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicle/listVehiclesBreakdownUseCase";
import Pagination from "@/components/Pagination";
import VehicleBreakdownsForm from "@/app/vehicles/[immatriculation]/breakdowns/VehicleBreakdownForm";
import HeadingTile from "@/components/HeadingTitle";

export default async function VehicleBreakdownListPage(pageProps: { params: any, searchParams: any }) {
    const {immatriculation} = await pageProps.params as { immatriculation: string }
    const paginationQuery = await useServerPagination(pageProps)
    const result = await listVehiclesBreakdownUseCase({immatriculation, ...paginationQuery})
    if (!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const {
        value, ...pagination
    } = result
    return <>
        <HeadingTile>
            Liste des pannes du véhicule <span className="text-gray-500">({immatriculation})</span>
        </HeadingTile>
        <List>
            {value.map(breakdown => (
                <ListItem link={`breakdowns/${breakdown.vehicleBreakdownId}`}  key={breakdown.vehicleBreakdownId}>
                    <div className="flex items-center gap-2">
                        <Chip>{breakdown.vehicleBreakdownId}</Chip>
                        {breakdown.description} - Date de maintenance le : {breakdown.date.toLocaleDateString()}
                    </div>
                </ListItem>
            ))
            }
        </List>
        <Pagination {...pagination}/>
        <VehicleBreakdownsForm vehicleImmatriculation={immatriculation}/>
    </>
}