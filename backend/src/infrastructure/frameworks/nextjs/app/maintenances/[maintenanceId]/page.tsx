import {
    showMaintenanceUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/maintenance/showMaintenanceUseCase";
import {ErrorCallout} from "@/components/ErrorCallout";
import MaintenanceForm from "@/app/maintenances/MaintenanceForm";

export default async function MaintenancePage(pageProps: {params: Promise<any>}) {
    const response = await showMaintenanceUseCase(await pageProps.params)
    if (!response.success) return <ErrorCallout>{response.error.message}</ErrorCallout>
    const {value} = response
    const maintenance = {
        maintenanceId: value.maintenanceId,
        maintenanceSpareParts : value.maintenanceSpareParts.map(sparePart => ({
            unitPrice: `${sparePart.unitPrice}`,
            quantity: `${sparePart.quantity}`,
            sparePartReference : sparePart.sparePartReference})),
        siret: value.garageSiret?.getValue() || "",
        vehiculeImmatriculation: value.vehiculeImmatriculation.getValue(),
        recommendation: value.recommendation,
        status: value.status,
    }
    return <div>
        <MaintenanceForm maintenance={maintenance}/>
    </div>
}