"use server";

import {useServerForm} from "@/hooks/useServerForm";
import {updateStockRequest} from "@infrastructureCore/requests/inventoryManagement/updateStockRequest";
import {Siret} from "@domain/shared/value-object/Siret";
import {
    createAddSparePartInStockUseCase
} from "@application/inventoryManagement/usecases/stock/AddSparePartInStockUseCase";
import {stockRepository} from "@infrastructureCore/repositories/inventoryManagement/stockRepository";
import {
    createRemoveSparePartInStockUseCase
} from "@application/inventoryManagement/usecases/stock/RemoveSparePartInStockUseCase";
import {
    inventoryManagementEventRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository";
import {
    inventorySparePartRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventorySparePartRepository";
import {notificationServices} from "@infrastructureCore/services/notificationServices";
import {
    createGetInventorySparePartUseCase
} from "@application/inventoryManagement/usecases/inventorySparePart/GetInventorySparePartUseCase";
import {Result} from "@shared/Result";

export async function updateDealerStock(prevState : any, formData : FormData){
    console.log(Number(formData.get('quantity')))
    return useServerForm(formData, updateStockRequest, async (payload, success, abort) =>{
        const siret = Siret.create(payload.siret)
        if(siret instanceof Error) return abort(siret.message)
        let response : Result;
        if(payload.quantity < 0){
            const removeSparePartInStockUseCase = createRemoveSparePartInStockUseCase(inventoryManagementEventRepository, stockRepository, inventorySparePartRepository, notificationServices)
            response = await removeSparePartInStockUseCase({
                ...payload, siret, quantity : Math.abs(payload.quantity)
            })
        }else if(payload.quantity > 0){
            const addSparePartInStockUseCase = createAddSparePartInStockUseCase(inventoryManagementEventRepository, createGetInventorySparePartUseCase(inventorySparePartRepository))
            response = await addSparePartInStockUseCase({
                ...payload, siret
            })
        }else{
            return abort("La quantité ne peut pas être nulle")
        }
        if(!response.success) return abort(response.error.message)
        return success(response.value)
    })
}