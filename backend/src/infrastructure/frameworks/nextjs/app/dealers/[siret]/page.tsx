"use server";

import {Siret} from "@domain/shared/value-object/Siret";
import {createShowDealerUseCase} from "@application/inventoryManagement/usecases/dealer/ShowDealerUseCase";
import {dealerRepository} from "@infrastructureCore/repositories/inventoryManagement/dealerRepository";
import {UnregisterActionButton} from "@/app/dealers/[siret]/UnregisterActionButton";

export default async function DealerShowPage(pageProps : {searchProps: any, params: any}){
    const {siret:siretString} = await pageProps.params
    const siret = Siret.create(siretString)
    if(siret instanceof Error) return <div>{siret.message}</div>
    const showDealerUseCase = createShowDealerUseCase(dealerRepository);
    const dealerResponse  = await showDealerUseCase({siret})
    if(!dealerResponse.success) return <div>{dealerResponse.error.message}</div>



    return <div>
        <div className={'font-semibold text-2xl'}> #{dealerResponse.value.siret.getValue()} {dealerResponse.value.name}</div>

        <h4 className={"text-xl"}>Adresse</h4>
        <ul>
            <li>Pays : <b>{dealerResponse.value.address.country}</b></li>
            <li>Ville : <b>{dealerResponse.value.address.city}</b></li>
            <li>Code postal : <b>{dealerResponse.value.address.postalCode}</b></li>
            <li>Rue : <b>{dealerResponse.value.address.street}</b></li>

        </ul>

        <br/>

        <UnregisterActionButton siretString={siretString}/>

    </div>
}