"use server";


import {useServerForm} from "@/hooks/useServerForm";
import {registerOrderRequest} from "@infrastructureCore/requests/inventoryManagement/registerOrderRequest";
import {Siret} from "@domain/shared/value-object/Siret";
import {OrderLine} from "@domain/inventoryManagement/value-object/OrderLine";
import {createRegisterOrderUseCase} from "@application/inventoryManagement/usecases/order/RegisterOrderUseCase";
import {
    inventoryManagementEventRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository";
import {dealerRepository} from "@infrastructureCore/repositories/inventoryManagement/dealerRepository";
import {
    inventorySparePartRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventorySparePartRepository";

export async function registerOrder(prevState:any, formData: FormData){
    return useServerForm(formData, registerOrderRequest, async (payload, success, abort)=>{
        const siret = Siret.create(payload.dealerSiret)
        if(siret instanceof Error) return abort(siret.message)
        const orderLines = payload.orderLines.map((line) => {
            return OrderLine.create(line)
        })
        const registerOrderUseCase = createRegisterOrderUseCase(inventoryManagementEventRepository,dealerRepository,inventorySparePartRepository)
        const result = await registerOrderUseCase({
            ...payload,
            dealer: siret,
            orderLines
        })
        if(!result.success) return abort(result.error.message)
        return success(result.value)
    })

}
