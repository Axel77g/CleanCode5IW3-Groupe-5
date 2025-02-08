"use server";

import List from "@/components/List";
import ListItem from "@/components/ListItem";
import Chip from "@/components/Chip";
import Pagination from "@/components/Pagination";
import {useServerPagination} from "@/hooks/useServerPagination";
import DriverIncidentsForm from "@/app/drivers/[driverLicenseId]/incidents/DriverIncidentsForm";
import {
    listDriverIncidentsUseCase
} from "@infrastructureCore/useCaseImplementation/testDrive/listDriverIncidentsUseCase";
import {ErrorCallout} from "@/components/ErrorCallout";

export default async function DriverIncidentsListPage(pageProps : {params : any, searchParams:any}) {
    const {driverLicenseId} = await pageProps.params as {driverLicenseId: string}
    const paginationQuery = await useServerPagination(pageProps)
    const result = await listDriverIncidentsUseCase({driverLicenseId, ...paginationQuery})
    if(!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const {
        value, ...pagination
    } = result
    return <div>
        <List>
            {value.map(incident => (
                <ListItem link={`test`} key={incident.incidentId}>
                    <Chip>{incident.type}</Chip> {incident.date.toISOString()}
                </ListItem>
            ))
            }
        </List>
        <Pagination {...pagination}/>
        <DriverIncidentsForm driverLicenseId={driverLicenseId}/>
    </div>
}