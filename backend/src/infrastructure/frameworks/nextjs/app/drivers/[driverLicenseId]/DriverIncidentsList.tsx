"use server";

import {Driver} from "@domain/testDrive/entities/Driver";
import {PaginationObject} from "@/hooks/useServerPagination";
import List from "@/components/List";
import {createListDriverIncidentsUseCase} from "@application/testDrive/usecases/incident/ListDriverIncidentsUseCase";
import {incidentRepository} from "@infrastructureCore/repositories/testDrive/incidentRepository";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";
import {Response} from "@expressApp/core/Response";
import ListItem from "@/components/ListItem";
import Chip from "@/components/Chip";
import Pagination from "@/components/Pagination";

export default async function DriverIncidentsList(props: {driver : Driver, pagination: PaginationObject}){
    const listDriverIncidentsUseCase = createListDriverIncidentsUseCase(incidentRepository, driverRepository)
    const result = await listDriverIncidentsUseCase({driverLicenseId: props.driver.driverLicenseId, ...props.pagination})
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
    </div>
}