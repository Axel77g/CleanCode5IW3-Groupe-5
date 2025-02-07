"use server"

import {useServerPagination} from "@/hooks/useServerPagination";
import ListItem from "@/components/ListItem";
import List from "@/components/List";
import Chip from "@/components/Chip";
import {ErrorCallout} from "@/components/ErrorCallout";
import {
    listVehiculesBreakdownUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicule/listVehiculesBreakdownUseCase";
import Pagination from "@/components/Pagination";
import VehiculeBreakdownsForm from "@/app/vehicules/[immatriculation]/breakdowns/VehiculeBreakdownForm";
import HeadingTile from "@/components/HeadingTitle";

export default async function VehiculeBreakdownListPage(pageProps: { params: any, searchParams: any }) {
    const {immatriculation} = await pageProps.params as { immatriculation: string }
    const paginationQuery = await useServerPagination(pageProps)
    const result = await listVehiculesBreakdownUseCase({immatriculation, ...paginationQuery})
    if (!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const {
        value, ...pagination
    } = result
    return <div>
        <HeadingTile>
            Liste des pannes du véhicule <span className="text-gray-500">({immatriculation})</span>
        </HeadingTile>
        <List>
            {value.map(breakdown => (
                <ListItem link={`test`} key={breakdown.vehiculeBreakdownId}>
                    <Chip>{breakdown.vehiculeBreakdownId}</Chip>{breakdown.description} - Date de maintenance le
                    : {breakdown.date.toLocaleDateString()}
                </ListItem>
            ))
            }
        </List>
        <Pagination {...pagination}/>
        <VehiculeBreakdownsForm vehiculeImmatriculation={immatriculation}/>
    </div>
}