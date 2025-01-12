'use server';
import {patchDriverRequest} from "@infrastructureCore/requests/testDrive/patchDriverRequest";
import {formDataToObject} from "@/utils/FormDataToObject";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {createPatchDriverUseCase} from "@application/testDrive/usecases/driver/PatchDriverUseCase";
import {
    testDriveEventRepository
} from "@infrastructureCore/repositories/testDrive/testDriveEventRepository";
import {registerDriverRequest} from "@infrastructureCore/requests/testDrive/registerDriverRequest";
import {createRegisterDriverUseCase} from "@application/testDrive/usecases/driver/RegisterDriverUseCase";
import {getFirstZodError} from "@/utils/getFirstZodError";

export async function patchDriverAction(prevState: any, formData : FormData){
    let rawPayload = formDataToObject(formData)
    const payloadResponse = patchDriverRequest.safeParse(rawPayload);
    if(!payloadResponse.success) return {message: getFirstZodError(payloadResponse.error), success: false, ...rawPayload}
    const payload = payloadResponse.data
    const driverLicenseId = DriverLicenseId.create(payload.driverLicenseId)
    if(driverLicenseId instanceof Error) return {message: driverLicenseId.message, success: false}
    const patchDriverUseCase = createPatchDriverUseCase(testDriveEventRepository)
    const result = await patchDriverUseCase({
        driverLicenseId,
        driver: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email
        }
    })
    if(!result.success) return {message: result.error.message, success: false, ...rawPayload}
    return {message: result.value, success: true, ...rawPayload}
}

export async function registerDriverAction(prevState: any, formData : FormData){
    const rawPayload = formDataToObject(formData)
    const payloadResponse = registerDriverRequest.safeParse(rawPayload);
    if(!payloadResponse.success) return {message: getFirstZodError(payloadResponse.error), success: false, ...rawPayload}
    const payload = payloadResponse.data
    const driverLicenseId = DriverLicenseId.create(payload.driverLicenseId)
    if(driverLicenseId instanceof Error) return {message: driverLicenseId.message, success: false}
    const registerDriverUseCase = createRegisterDriverUseCase(testDriveEventRepository)
    const result = await registerDriverUseCase({
        driverLicenseId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        driverLicensedAt: payload.driverLicensedAt
    })
    if(!result.success) return {message: result.error.message, success: false,  ...rawPayload}
    return {message: result.value, success: true,}
}