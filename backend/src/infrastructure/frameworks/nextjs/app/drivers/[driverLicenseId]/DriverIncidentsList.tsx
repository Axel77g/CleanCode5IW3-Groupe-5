"use server";

import {Driver} from "@domain/testDrive/entities/Driver";
import {PaginationObject} from "@/hooks/useServerPagination";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import Chip from "@/components/Chip";
import Pagination from "@/components/Pagination";
import {
    listDriverIncidentsUseCase
} from "@infrastructureCore/useCaseImplementation/testDrive/listDriverIncidentsUseCase";
import {ErrorCallout} from "@/components/ErrorCallout";

export default async function DriverIncidentsList(props: {driver : Driver, pagination: PaginationObject}){
    const result = await listDriverIncidentsUseCase({driverLicenseId: props.driver.driverLicenseId.getValue(), ...props.pagination})
    if(!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const {value, ...pagination } = result

    return <div>
        <List>
            {value.map(incident => (
                    <ListItem link={`test`}>
                        <Chip>#{incident.incidentId}</Chip> {incident.date.toISOString()}
                    </ListItem>
                ))
            }
        </List>
        <Pagination {...pagination}/>
    </div>
}