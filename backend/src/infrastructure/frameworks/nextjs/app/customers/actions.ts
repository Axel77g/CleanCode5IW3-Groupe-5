import { useServerForm } from '@/hooks/useServerForm';
import {
    createRegisterCustomerUseCase
} from '@application/maintenance/usecases/customer/RegisterCustomerUseCase';
import { Customer } from '@domain/maintenance/entities/Customer';
import { Address } from '@domain/shared/value-object/Address';
import { inventoryManagementEventRepository } from '@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository';
import { customerRepository } from '@infrastructureCore/repositories/maintenance/customerRepository';
import {
    registerCustomerRequest
} from '@infrastructureCore/requests/maintenance/registerCustomerRequest';
"use server"

export async function registerCustomer(prevState: any, formData: FormData) {
    return useServerForm(formData, registerCustomerRequest, async (payload, success, abort) => {
        const address = Address.create(payload.address)
        if (address instanceof Error) return abort(address.message)
        const registerCustomerUseCase = createRegisterCustomerUseCase(inventoryManagementEventRepository, customerRepository)
        const registerResponse = await registerCustomerUseCase({
            customerId: Customer.generateID(),
            name: payload.name,
            phoneNumber: payload.phoneNumber,
            email: payload.email,
            address,
        })
        if (!registerResponse.success) return abort(registerResponse.error.message)
        return success(registerResponse.value)
    })
}