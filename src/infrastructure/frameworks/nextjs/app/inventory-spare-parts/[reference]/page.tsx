import {
    createGetInventorySparePartUseCase
} from "@application/inventoryManagement/usecases/inventorySparePart/GetInventorySparePartUseCase";
import {
    inventorySparePartRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventorySparePartRepository";
import {ErrorCallout} from "@/components/ErrorCallout";
import {UpsertInventorySparePartForm} from "@/app/inventory-spare-parts/UpsertInventorySparePartForm";

export default async function InventorySparePartInfoPage(pageProps: { params: Promise<{ reference: string }> }) {
    const {reference} = await pageProps.params
    const getInventorySparePartUseCase = createGetInventorySparePartUseCase(inventorySparePartRepository)
    const result = await getInventorySparePartUseCase({reference})
    if (!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    return <div>
        <UpsertInventorySparePartForm reference={result.value.reference} name={result.value.name}/>
    </div>
}