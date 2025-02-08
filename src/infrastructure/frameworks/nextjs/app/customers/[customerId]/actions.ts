"use server";

import {abort, ActionResponse, success, useServerForm} from "@/hooks/useServerForm";
import {updateCustomerRequest} from "@infrastructureCore/requests/maintenance/customer/updateCustomerRequest";
import {updateCustomerUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/customer/updateCustomerUseCase";
import {unregisterCustomerUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/customer/unregisterCustomerUseCase";
import {
    assignVehicleToCustomerUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicle/assignVehicleToCustomerUseCase";
import {
    assignVehicleToCustomerRequest
} from "@infrastructureCore/requests/maintenance/vehicle/assignVehicleToCustomerRequest";

export interface UnregisterCustomerActionState extends ActionResponse{
    customerIdString:string
}

export async function updateCustomerAction(prevState: any, formData : FormData) {
    return useServerForm(formData, updateCustomerRequest, async (payload, success,abort)=>{
        const result = await updateCustomerUseCase(payload)
        if(!result.success) return abort(result.error.message)
        return success(result.value)
    })
}

export async function unregisterCustomerAction(state : UnregisterCustomerActionState){
    const result = await unregisterCustomerUseCase({customerId : state.customerIdString})
    if(!result.success) return abort(result.error.message)
    return success(result.value)
}

export async function assignVehicleToCustomer(prevState: any, formData: FormData){
    return useServerForm(formData, assignVehicleToCustomerRequest, async (payload, success, abort)=>{
    const result = await assignVehicleToCustomerUseCase(payload)
    if(!result.success) return abort(result.error.message)
    return success(result.value)
    })
}