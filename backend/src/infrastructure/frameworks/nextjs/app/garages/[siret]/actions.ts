"use server"

import {abort, ActionResponse, success} from "@/hooks/useServerForm";
import {unregisterGarageUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/garage/unregisterGarageUseCase";

export interface UnregisterGarageActionState extends ActionResponse{
    siretString: string
}

export async function unregisterGarageAction(state: UnregisterGarageActionState){
    const result = await unregisterGarageUseCase({siret: state.siretString})
    if(!result.success) return abort(result.error.message)
    return success(result.value)
}