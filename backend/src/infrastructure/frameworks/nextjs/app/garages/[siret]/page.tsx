"use server";

import {showGarageUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/garage/showGarageUseCase";
import {ErrorCallout} from "@/components/ErrorCallout";
import {
    listGarageMaintenancesUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/garage/listGarageMaintenancesUseCase";
import {useServerPagination} from "@/hooks/useServerPagination";
import {Form} from "@/components/Form";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import {UnregisterGarageButton} from "@/app/garages/[siret]/UnregisterGarageButton";
import Pagination from "@/components/Pagination";


export default async function GarageShowPage(pageProps: { searchParams: any }) {
    const {siret} = await pageProps.params
    const result = await showGarageUseCase({siret})
    if (!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const listMaintenancesResult = await listGarageMaintenancesUseCase({
        garageSiret: siret,
        ...await useServerPagination(pageProps)
    })
    if (!listMaintenancesResult.success) return <ErrorCallout>{listMaintenancesResult.error.message}</ErrorCallout>
    const {value} = result
    const {value: listMaintenances, ...pagination} = listMaintenancesResult
    return <div>
        <div className={'font-semibold text-2xl'}> # {value.name} | Siret :
            <span className={"text-gray-500"}> {value.siret.getValue()}</span>
        </div>


        <div className={"flex flex-col gap-2"}>
            <h4 className={"text-lg mt-5"}>Adresse du garage</h4>
            <hr/>
            <ul>
                <li>Pays : <b>{value.address.country}</b></li>
                <li>Ville : <b>{value.address.city}</b></li>
                <li>Code postal : <b>{value.address.postalCode}</b></li>
                <li>Rue : <b>{value.address.street}</b></li>
            </ul>
        </div>


        <Form title={"Liste des maintenances"}>
            <List>
                {
                    listMaintenances.map((maintenance, index) => {
                        return <ListItem link={`/maintenances/${maintenance.maintenanceId}`}
                                         key={index}>
                            #{maintenance.maintenanceId} | {maintenance.recommendation} | {maintenance.date.toLocaleDateString()}
                        </ListItem>
                    })
                }
            </List>

            <Pagination {...pagination} />
        </Form>

        <br/>

        <div className="flex items-center gap-4">
            <UnregisterGarageButton siretString={siret}/>
        </div>
    </div>
}