"use server"

import {showVehiculeUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/vehicule/showVehiculeUseCase";
import {ErrorCallout} from "@/components/ErrorCallout";
import {Button} from "@/components/Button";
import Link from "next/link";
import VehiculeUpdateForm from "@/app/vehicules/[immatriculation]/VehiculeUpdateForm";
import {UnregisterVehiculeActionButton} from "@/app/vehicules/[immatriculation]/UnregisterVehiculeActionButton";

export default async function VehiculeDetailPage(pageProps: {params: any, searchParams:any}) {
    const {immatriculation} = await pageProps.params as {immatriculation: string}
    const result = await showVehiculeUseCase({immatriculation})
    if (!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const vehicule = {
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
    const vehiculePath = `/vehicules/${immatriculation}`
    return (
        <div>
            <h1 className={"text-xl font-semibold"}>Détails du véhicule :
                <span className="text-gray-500"> {vehicule.model} - {vehicule.immatriculation}</span>
            </h1>
            <VehiculeUpdateForm vehicule={vehicule}/>

            <br/>
            <hr/>
            <br/>

            <div className="flex gap-4">

                    <UnregisterVehiculeActionButton immatriculationString={immatriculation}/>

                    <Link href={`${vehiculePath}/breakdowns`}>
                        <Button>
                            Accéder aux pannes
                        </Button>
                    </Link>
            </div>
        </div>
    )
}