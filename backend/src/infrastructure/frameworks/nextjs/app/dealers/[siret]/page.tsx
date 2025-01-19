"use server";

import {Siret} from "@domain/shared/value-object/Siret";

export default async function (pageProps : {searchProps: any, params: any}){
    const {siret:siretString} = await pageProps.params
    const siret = Siret.create(siretString)
    if(siret instanceof Error) return <div>{siret.message}</div>

    return <div>

    </div>
}