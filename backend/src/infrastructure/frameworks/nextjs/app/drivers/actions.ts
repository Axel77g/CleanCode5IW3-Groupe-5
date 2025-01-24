'use server';

import {formDataToObject} from "@/utils/FormDataToObject";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {
    testDriveEventRepository
} from "@infrastructureCore/repositories/testDrive/testDriveEventRepository";
import {registerDriverRequest} from "@infrastructureCore/requests/testDrive/registerDriverRequest";
import {createRegisterDriverUseCase} from "@application/testDrive/usecases/driver/RegisterDriverUseCase";
import {getFirstZodError} from "@/utils/getFirstZodError";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";

export async function registerDriverAction(prevState: any, formData : FormData){
    const rawPayload = formDataToObject(formData)
    const payloadResponse = registerDriverRequest.safeParse(rawPayload);
    if(!payloadResponse.success) return {message: getFirstZodError(payloadResponse.error), success: false, ...rawPayload}
    const payload = payloadResponse.data
    const driverLicenseId = DriverLicenseId.create(payload.driverLicenseId)
    if(driverLicenseId instanceof Error) return {message: driverLicenseId.message, success: false}
    const registerDriverUseCase = createRegisterDriverUseCase(testDriveEventRepository, driverRepository)
    const result = await registerDriverUseCase({
        driverLicenseId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        birthDate: payload.birthDate,
        driverLicensedAt: payload.driverLicensedAt
    })
    if(!result.success) return {message: result.error.message, success: false,  ...rawPayload}
    return {message: result.value, success: true,}
}