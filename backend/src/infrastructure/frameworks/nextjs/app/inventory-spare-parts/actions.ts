"use server"

import {sparePartRequest} from "@infrastructureCore/requests/inventoryManagement/sparePartRequest";
import {useServerForm} from "@/hooks/useServerForm";
import {
    createUpsertInventorySparePartUseCase
} from "@application/inventoryManagement/usecases/inventorySparePart/UpsertInventorySparePartUseCase";
import {
    inventoryManagementEventRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository";

export async function upsertInventorySparePart(prevState:any, formData: FormData){
    return useServerForm(formData,sparePartRequest,async (data, success,abort)=>{
        const upsertInventorySparePartUseCase = createUpsertInventorySparePartUseCase(inventoryManagementEventRepository)
        const response = await upsertInventorySparePartUseCase(data)
        if(!response.success) return abort(response.error.message)
        return success(response.value)
    })
}