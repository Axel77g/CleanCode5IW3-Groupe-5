"use server";
import {useServerForm} from "@/hooks/useServerForm";
import {registerOrderRequest} from "@infrastructureCore/requests/inventoryManagement/registerOrderRequest";
import {updateOrderStatusRequest} from "@infrastructureCore/requests/inventoryManagement/updateOrderStatusRequest";
import {registerOrderUseCase} from "@infrastructureCore/useCaseImplementation/InventoryManagement/registerOrderUseCase";
import {
    updateOrderStatusUseCase
} from "@infrastructureCore/useCaseImplementation/InventoryManagement/updateOrderStatusUseCase";

export async function registerOrder(prevState:any, formData: FormData){
    return useServerForm(formData, registerOrderRequest, async (payload, success, abort)=>{
        const result = await registerOrderUseCase(payload)
        if(!result.success) return abort(result.error.message)
        return success(result.value)
    })

}

export async function updateOrderStatus(prevState: any, formData: FormData){
    return useServerForm(formData, updateOrderStatusRequest, async(payload, success, abort)=>{
        const result = await updateOrderStatusUseCase(payload)
        if(!result.success) return abort(result.error.message);
        return success(result.value)
    })
}