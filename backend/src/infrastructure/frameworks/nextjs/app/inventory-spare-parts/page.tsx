import List from "@/components/List";
import {useServerPagination} from "@/hooks/useServerPagination";
import {
    createListInventorySparePartUseCase
} from "@application/inventoryManagement/usecases/inventorySparePart/ListInventorySparePartUseCase";
import {
    inventorySparePartRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventorySparePartRepository";
import {ErrorCallout} from "@/components/ErrorCallout";
import Pagination from "@/components/Pagination";
import HeadingTile from "@/components/HeadingTitle";
import ListItem from "@/components/ListItem";
import {UpsertInventorySparePartForm} from "@/app/inventory-spare-parts/UpsertInventorySparePartForm";
import {getInventorySpareParts} from "@/app/inventory-spare-parts/actions";

export default async function InventorySparePartListPage(pageProps: {searchParams: any}){
    const pagination = await useServerPagination(pageProps)
    const search = pageProps.searchParams?.search
    const result = await getInventorySpareParts(pagination,search)
    if(!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const {value,...paginationProps} = result
    return <>
        <HeadingTile>
            Liste des pièces détachées
        </HeadingTile>
        <List>
            {
                result.value.map((sparePart)=> (
                    <ListItem link={`/inventory-spare-parts/${sparePart.reference}`}>
                        {sparePart.name}
                    </ListItem>
                ))
            }
        </List>
        <Pagination {...paginationProps}/>
        <UpsertInventorySparePartForm />
    </>
}