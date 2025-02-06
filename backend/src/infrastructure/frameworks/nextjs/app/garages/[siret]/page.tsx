"use server";

import {showGarageUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/garage/showGarageUseCase";
import {ErrorCallout} from "@/components/ErrorCallout";
import Link from "next/link";
import {Button} from "@/components/Button";
import {UnregisterGarageButton} from "@/app/garages/[siret]/UnregisterGarageButton";

export default async function GarageShowPage(pageProps: { searchProps: any, params: any }) {
    const {siret} = await pageProps.params
    const result = await showGarageUseCase({siret})
    if (!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const {value} = result
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

        <br/>

        <div className="flex items-center gap-4">
            <UnregisterGarageButton siretString={siret}/>

            <Link href={`/garages/${siret}/maintenances`}>
                <Button>Voir les maintenances</Button>
            </Link>
        </div>
    </div>
}