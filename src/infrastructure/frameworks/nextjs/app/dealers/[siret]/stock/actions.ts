"use server";

import {useServerForm} from "@/hooks/useServerForm";
import {updateStockRequest} from "@infrastructureCore/requests/inventoryManagement/updateStockRequest";
import {
    removeSparePartInStockUseCase
} from "@infrastructureCore/useCaseImplementation/InventoryManagement/removeSparePartInStockUseCase";
import {
    addSparePartInStockUseCase
} from "@infrastructureCore/useCaseImplementation/InventoryManagement/addSparePartInStockUseCase";
import {Result} from "@shared/Result";

export async function updateDealerStock(prevState : any, formData : FormData){
    return useServerForm(formData, updateStockRequest, async (payload, success, abort) =>{
        let response : Result;
        if(payload.quantity < 0)  response = await removeSparePartInStockUseCase({...payload, quantity: Math.abs(payload.quantity)});
        else if(payload.quantity > 0) response = await addSparePartInStockUseCase(payload) ;
        else return abort("La quantité ne peut pas être nulle")
        if(!response.success) return abort(response.error.message)
        return success(response.value)
    })
}