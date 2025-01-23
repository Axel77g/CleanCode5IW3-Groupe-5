"use server";

import { ActionResponse, useServerForm } from "@/hooks/useServerForm";
import { createRegisterTestDriveUseCase } from "@application/testDrive/usecases/testDrive/RegisterTestDriveUseCase";
import { VehiculeImmatriculation } from "@domain/shared/value-object/VehiculeImmatriculation";
import { DriverLicenseId } from "@domain/testDrive/value-object/DriverLicenseId";
import { Period } from "@domain/testDrive/value-object/Period";
import { driverRepository } from "@infrastructureCore/repositories/testDrive/driverRepository";
import { testDriveEventRepository } from "@infrastructureCore/repositories/testDrive/testDriveEventRepository";
import { registerTestDriveRequest } from "@infrastructureCore/requests/testDrive/registerTestDriveRequest";

export async function registerDriverTestDrive(state: Awaited<ActionResponse>, formData: FormData) {
    return useServerForm(formData, registerTestDriveRequest, async (payload, success, abort) => {
        const driverLicenseId = DriverLicenseId.create(payload.driverLicenseId)
        if (driverLicenseId instanceof Error) return abort(driverLicenseId.message)
        const vehicleImmatriculation = VehiculeImmatriculation.create(payload.vehicleImmatriculation)
        if (vehicleImmatriculation instanceof Error) return abort(vehicleImmatriculation.message)
        const registerDriverTestDriveUseCase = createRegisterTestDriveUseCase(testDriveEventRepository, driverRepository)
        const period = Period.create(payload.period.startDate, payload.period.endDate)
        if (period instanceof Error) return abort(period.message)
        const result = await registerDriverTestDriveUseCase({
            vehicleImmatriculation,
            driverLicenseId,
            period
        })
        if (!result.success) return abort(result.error.message)
        return success(result.value)
    })
}