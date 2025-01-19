"use server";


import {formDataToObject} from "@/utils/FormDataToObject";
import {patchDriverRequest} from "@infrastructureCore/requests/testDrive/patchDriverRequest";
import {getFirstZodError} from "@/utils/getFirstZodError";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {createPatchDriverUseCase} from "@application/testDrive/usecases/driver/PatchDriverUseCase";
import {testDriveEventRepository} from "@infrastructureCore/repositories/testDrive/testDriveEventRepository";
import {FormResponse, useServerForm} from "@/hooks/useServerForm";
import {registerIncidentRequest} from "@infrastructureCore/requests/testDrive/registerIncidentRequest";
import {Driver} from "@domain/testDrive/entities/Driver";
import {createRegisterIncidentUseCase} from "@application/testDrive/usecases/incident/RegisterIncidentUseCase";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";
import {registerTestDriveRequest} from "@infrastructureCore/requests/testDrive/registerTestDriveRequest";
import {VehicleImmatriculation} from "@domain/shared/value-object/VehicleImmatriculation";
import {createRegisterTestDriveUseCase} from "@application/testDrive/usecases/testDrive/RegisterTestDriveUseCase";
import {Period} from "@domain/testDrive/value-object/Period";

export function patchDriverAction(prevState: any, formData : FormData){
    return useServerForm(formData, patchDriverRequest, async (payload, success,abort)=>{
        const driverLicenseId = DriverLicenseId.create(payload.driverLicenseId)
        if(driverLicenseId instanceof Error) return abort(driverLicenseId.message)
        const patchDriverUseCase = createPatchDriverUseCase(testDriveEventRepository)
        const result = await patchDriverUseCase({
            driverLicenseId,
            driver: {
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email
            }
        })
        if(!result.success) return abort(result.error.message)
        return success(result.value)
    })
}

export async function registerDriverIncident(prevState: FormResponse, formData : FormData){
    return useServerForm(formData, registerIncidentRequest, async (payload, success, abort)=> {
        const driverLicenseId = DriverLicenseId.create(payload.driverLicenseId)
        if(driverLicenseId instanceof Error) return abort(driverLicenseId.message)
        const registerDriverIncidentUseCase = createRegisterIncidentUseCase(testDriveEventRepository,driverRepository)
        const result = await registerDriverIncidentUseCase({
            driverLicenseId,
            ...payload
        })
        if(!result.success) return abort(result.error.message)
        return success(result.value)
    })
}

export async function registerDriverTestDrive(prevState : FormResponse, formData: FormData){
    return useServerForm(formData, registerTestDriveRequest, async (payload, success, abort)=> {
        const driverLicenseId  = DriverLicenseId.create(payload.driverLicenseId)
        if(driverLicenseId instanceof Error) return abort(driverLicenseId.message)
        const vehicleImmatriculation = VehicleImmatriculation.create(payload.vehicleImmatriculation)
        if(vehicleImmatriculation instanceof Error) return abort(vehicleImmatriculation.message)
        const registerDriverTestDriveUseCase = createRegisterTestDriveUseCase(testDriveEventRepository,driverRepository)
        const period = Period.create(payload.startDate, payload.endDate)
        if(period instanceof Error) return abort(period.message)
        const result = await registerDriverTestDriveUseCase({
            vehicleImmatriculation,
            driverLicenseId,
            period
        })
        if(!result.success) return abort(result.error.message)
        return success(result.value)
    })
}