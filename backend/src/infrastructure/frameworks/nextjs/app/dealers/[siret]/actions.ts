"use server";

import {abort, ActionResponse, success} from "@/hooks/useServerForm";
import {
    unregisterDealerUseCase
} from "@infrastructureCore/useCaseImplementation/InventoryManagement/unregisterDealerUseCase";

export interface UnregisterDealerActionState extends ActionResponse{
    siretString:string
}

export async function unregisterDealerAction(state : UnregisterDealerActionState){
    const result = await unregisterDealerUseCase({siret : state.siretString})
    if(!result.success) return abort(result.error.message)
    return success(result.value)
}