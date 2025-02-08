"use server"

import {showVehicleUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/vehicle/showVehicleUseCase";
import {ErrorCallout} from "@/components/ErrorCallout";
import VehicleUpdateForm from "@/app/vehicles/[immatriculation]/VehicleUpdateForm";
import {UnregisterVehicleActionButton} from "@/app/vehicles/[immatriculation]/UnregisterVehicleActionButton";
import HeadingTile from "@/components/HeadingTitle";

export default async function VehicleDetailPage(pageProps: {params: any, searchParams:any}) {
    const {immatriculation} = await pageProps.params as {immatriculation: string}
    const result = await showVehicleUseCase({immatriculation})
    if (!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const vehicle = {
        immatriculation: result.value.immatriculation.getValue(),
        vin: result.value.vin.getValue(),
        mileage: result.value.mileage + "" ,
        brand: result.value.brand,
        model: result.value.model,
        year: result.value.year + "",
        maintenanceInterval: {
            mileage: result.value.maintenanceInterval.mileage + "" ,
            duration: result.value.maintenanceInterval.duration + "" ,
            lastMaintenance: {
                date: result.value.maintenanceInterval.lastMaintenance.date,
                mileage: result.value.maintenanceInterval.lastMaintenance.mileage + "" ,
            }
        },
        warranty: {
            periodStart: result.value.warranty.startDate,
            periodEnd: result.value.warranty.endDate,
        },
        status: result.value.status,
    }
    return (
        <div>
            <HeadingTile>Détails du véhicule :
                <span className="text-gray-500"> {vehicle.model} - {vehicle.immatriculation}</span>
            </HeadingTile>
            <VehicleUpdateForm vehicle={vehicle} />

            <br/>
            <hr/>
            <br/>

            <div className="flex gap-4">
                <UnregisterVehicleActionButton immatriculationString={immatriculation}/>
            </div>
        </div>
    )
}