"use server";

import {createListDriverIncidentsUseCase} from "@application/testDrive/usecases/incident/ListDriverIncidentsUseCase";
import {incidentRepository} from "@infrastructureCore/repositories/testDrive/incidentRepository";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";
import {Response} from "@expressApp/core/Response";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import Chip from "@/components/Chip";
import Pagination from "@/components/Pagination";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {useServerPagination} from "@/hooks/useServerPagination";
import DriverIncidentsForm from "@/app/drivers/[driverLicenseId]/incidents/DriverIncidentsForm";

export default async function DriverIncidentsListPage(pageProps : {params : any, searchParams:any}) {
    const {driverLicenseId : driverLicenseIdString} = await pageProps.params
    const paginationQuery = await useServerPagination(pageProps)
    const driverLicenseId = DriverLicenseId.create(driverLicenseIdString)
    if(driverLicenseId instanceof Error) return <div>{driverLicenseIdString.message}</div>
    const listDriverIncidentsUseCase = createListDriverIncidentsUseCase(incidentRepository, driverRepository)
    const result = await listDriverIncidentsUseCase({driverLicenseId, ...paginationQuery})
    if(!result.success) return Response.Fail(400, result.error.message)
    const {value, ...pagination } = result

    return <div>
        <List>
            {result.value.map(incident => (
                <ListItem link={`${location.href}`}>
                    <Chip>#{incident.incidentId}</Chip> {incident.date}
                </ListItem>
            ))
            }
        </List>
        <Pagination {...pagination}/>
        <DriverIncidentsForm driverLicenseId={driverLicenseId.getValue()}/>
    </div>
}