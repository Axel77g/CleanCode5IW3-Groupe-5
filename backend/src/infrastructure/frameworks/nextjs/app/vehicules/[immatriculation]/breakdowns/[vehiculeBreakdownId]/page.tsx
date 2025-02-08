import {
    showVehiculeBreakdownUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehiculeBreakdown/showVehiculeBreakdownUseCase";
import {ErrorCallout} from "@/components/ErrorCallout";
import {
    AssignVehiculeBreakdownForm
} from "@/app/vehicules/[immatriculation]/breakdowns/[vehiculeBreakdownId]/AssignVehiculeBreakdownForm";

export default async function CustomerDetailPage(pageProps: { params: any, searchParams: any }) {
    const {vehiculeBreakdownId, immatriculation} = await pageProps.params
    const result = await showVehiculeBreakdownUseCase({vehiculeBreakdownId})
    console.log(result);
    if (!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const {value} = result
    return <>
        <div className={"flex flex-col gap-2"}>
            <h1 className={"text-xl font-semibold"}>Détail de la panne #{vehiculeBreakdownId}</h1>

            <hr/>
            <div className="flex flex-col gap-2">
                <ul>
                    <li>Description : <b>{value.description}</b></li>
                    <li>Date de maintenance : <b>{value.date.toLocaleDateString()}</b></li>
                    <li>Immatriculation du véhicule : <b>{value.vehiculeImmatriculation.getValue()}</b></li>
                </ul>
                <AssignVehiculeBreakdownForm vehiculeBreakdownId={vehiculeBreakdownId} immatriculation={immatriculation}/>
            </div>
        </div>
    </>

}