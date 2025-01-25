"use server";

import {Siret} from "@domain/shared/value-object/Siret";
import {createUnregisterDealerUseCase} from "@application/inventoryManagement/usecases/dealer/UnregisterDealerUseCase";
import {
    inventoryManagementEventRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository";
import {abort, ActionResponse, success} from "@/hooks/useServerForm";
import {dealerRepository} from "@infrastructureCore/repositories/inventoryManagement/dealerRepository";

export interface UnregisterDealerActionState extends ActionResponse{
    siretString:string
}

export async function unregisterDealerAction(state : UnregisterDealerActionState){
    const siret = Siret.create(state.siretString)
    if(siret instanceof Error) return siret
    const unregisterDealerUseCase = createUnregisterDealerUseCase(inventoryManagementEventRepository, dealerRepository)
    const response = await unregisterDealerUseCase({siret})
    if(!response.success) return abort(response.error.message)
    return success(response.value)
}