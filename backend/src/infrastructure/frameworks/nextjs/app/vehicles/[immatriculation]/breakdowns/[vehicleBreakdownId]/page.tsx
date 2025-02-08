import {
    showVehicleBreakdownUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicleBreakdown/showVehicleBreakdownUseCase";
import {ErrorCallout} from "@/components/ErrorCallout";
import {
    AssignVehicleBreakdownForm
} from "@/app/vehicles/[immatriculation]/breakdowns/[vehicleBreakdownId]/AssignVehicleBreakdownForm";

export default async function CustomerDetailPage(pageProps: { params: any, searchParams: any }) {
    const {vehicleBreakdownId, immatriculation} = await pageProps.params
    const result = await showVehicleBreakdownUseCase({vehicleBreakdownId})
    if (!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const {value} = result
    return <>
        <div className={"flex flex-col gap-2"}>
            <h1 className={"text-xl font-semibold"}>Détail de la panne #{vehicleBreakdownId}</h1>

            <hr/>
            <div className="flex flex-col gap-2">
                <ul>
                    <li>Description : <b>{value.description}</b></li>
                    <li>Date de maintenance : <b>{value.date.toLocaleDateString()}</b></li>
                    <li>Immatriculation du véhicule : <b>{value.vehicleImmatriculation.getValue()}</b></li>
                </ul>
                <AssignVehicleBreakdownForm vehicleBreakdownId={vehicleBreakdownId} immatriculation={immatriculation}/>
            </div>
        </div>
    </>

}