"use server";


import {useServerForm} from "@/hooks/useServerForm";
import {registerDealerRequest} from "@infrastructureCore/requests/inventoryManagement/registerDealerRequest";
import {Siret} from "@domain/shared/value-object/Siret";

export async function registerDealer(prevState: any, formData: FormData){
    return useServerForm(formData,registerDealerRequest, async (payload, success, abort) =>{
        const siret = Siret.create(payload.siret)
        if(siret instanceof Error) return abort(siret.message)

        return success("ok")
    })
}