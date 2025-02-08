"use server";

import {UnregisterActionButton} from "@/app/dealers/[siret]/UnregisterActionButton";
import {ErrorCallout} from "@/components/ErrorCallout";
import {Button} from "@/components/Button";
import Link from "next/link";
import {showDealerUseCase} from "@infrastructureCore/useCaseImplementation/InventoryManagement/showDealerUseCase";

export default async function DealerShowPage(pageProps : {searchProps: any, params: any}){
    const {siret} = await pageProps.params
    const result = await showDealerUseCase({siret})
    if(!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const {value} = result
    return <>
        <div className={'font-semibold text-2xl'}> Informations de la concession</div>

        <ul>
            <li>
                Nom : <b>{value.name}</b>
            </li>
            <li>
                siret: <b>{value.siret.getValue()}</b>

            </li>
        </ul>

        <h4 className={"text-xl"}>Adresse</h4>
        <ul>
            <li>Pays : <b>{value.address.country}</b></li>
            <li>Ville : <b>{value.address.city}</b></li>
            <li>Code postal : <b>{value.address.postalCode}</b></li>
            <li>Rue : <b>{value.address.street}</b></li>
        </ul>
        <hr/>
        <div className="flex gap-4">

            <UnregisterActionButton siretString={siret}/>

            <Link href={`/dealers/${siret}/stock`} >
                <Button >Voir le stock</Button>
            </Link>
            <Link href={`/dealers/${siret}/orders`} >
                <Button >Voir les commandes</Button>
            </Link>
        </div>
    </>
}