import {ErrorCallout} from "@/components/ErrorCallout";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import {AddOrRemoveSpareFromStockForm} from "@/app/dealers/[siret]/stock/AddOrRemoveSpareFromStockForm";
import {
    showDealerStockUseCase
} from "@infrastructureCore/useCaseImplementation/InventoryManagement/showDealerStockUseCase";
import HeadingTile from "@/components/HeadingTitle";
import Chip from "@/components/Chip";

export default async function StockPage(pageProps: {params: Promise<{siret: string}>}){
    const {siret} = await pageProps.params
    const result = await showDealerStockUseCase({siret})
    if(!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    return <>
        <HeadingTile>
            Stock du concessionnaire <Chip>{siret}</Chip>
        </HeadingTile>
        <List>
            {
                result.value.map(stock=>(
                    <ListItem key={stock.sparePartReference} link={"/inventory-spare-parts/"+stock.sparePartReference}>
                        {stock.sparePartReference} - {stock.quantity} pièce(s)
                    </ListItem>
                ))
            }
        </List>
        <AddOrRemoveSpareFromStockForm siret={siret}/>
    </>
}