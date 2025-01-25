"use server";

import {ActionResponse, useServerForm} from "@/hooks/useServerForm";
import {registerTestDriveRequest} from "@infrastructureCore/requests/testDrive/registerTestDriveRequest";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {createRegisterTestDriveUseCase} from "@application/testDrive/usecases/testDrive/RegisterTestDriveUseCase";
import {testDriveEventRepository} from "@infrastructureCore/repositories/testDrive/testDriveEventRepository";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";
import {Period} from "@domain/testDrive/value-object/Period";
import {ApplicationException} from "@shared/ApplicationException";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";

export async function registerDriverTestDrive(state : Awaited<ActionResponse>, formData: FormData){
    return useServerForm(
        formData,
        registerTestDriveRequest,
        async (payload, success, abort)=> {
            const driverLicenseId  = DriverLicenseId.create(payload.driverLicenseId)
            if(driverLicenseId instanceof ApplicationException) return abort(driverLicenseId.message)
            const vehicleImmatriculation = VehiculeImmatriculation.create(payload.vehicleImmatriculation)
            if(vehicleImmatriculation instanceof ApplicationException) return abort(vehicleImmatriculation.message)
            const period = Period.create(payload.period.startDate, payload.period.endDate)
            if(period instanceof ApplicationException) return abort(period.message)
            const registerDriverTestDriveUseCase = createRegisterTestDriveUseCase(testDriveEventRepository,driverRepository)
            const result = await registerDriverTestDriveUseCase({
                vehicleImmatriculation,
                driverLicenseId,
                period
            })
            if(!result.success) return abort(result.error.message)
            return success(result.value)
        })
}