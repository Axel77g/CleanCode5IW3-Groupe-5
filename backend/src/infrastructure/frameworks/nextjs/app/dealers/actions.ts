"use server";

import {useServerForm} from "@/hooks/useServerForm";
import {registerDealerRequest} from "@infrastructureCore/requests/inventoryManagement/registerDealerRequest";
import {Siret} from "@domain/shared/value-object/Siret";
import {Address} from "@domain/shared/value-object/Address";
import {createRegisterDealerUseCase} from "@application/inventoryManagement/usecases/dealer/RegisterDealerUseCase";
import {
    inventoryManagementEventRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository";

export async function registerDealer(prevState: any, formData: FormData){
    return useServerForm(formData,registerDealerRequest, async (payload, success, abort) =>{
        const address = Address.create(payload.address)
        if(address instanceof Error) return abort(address.message)
        const siret = Siret.create(payload.siret)
        if(siret instanceof Error) return abort(siret.message)
        const registerDealerUseCase = createRegisterDealerUseCase(inventoryManagementEventRepository)
        const registerResponse = await registerDealerUseCase({
            siret,
            name: payload.name,
            address,
            phoneNumber: payload.phoneNumber
        })
        if(!registerResponse.success) return abort(registerResponse.error.message)
        return success(registerResponse.value)
    })
}