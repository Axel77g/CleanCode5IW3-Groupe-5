import {ErrorCallout} from "@/components/ErrorCallout";
import {createShowDealerStockUseCase} from "@application/inventoryManagement/usecases/stock/ShowDealerStockUseCase";
import {stockRepository} from "@infrastructureCore/repositories/inventoryManagement/stockRepository";
import {Siret} from "@domain/shared/value-object/Siret";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import {AddOrRemoveSpareFromStockForm} from "@/app/dealers/[siret]/stock/AddOrRemoveSpareFromStockForm";

export default async function StockPage(pageProps: {params: Promise<{siret: string}>}){
    const {siret : siretString} = await pageProps.params
    const siret = Siret.create(siretString)
    if(siret instanceof Error) return <ErrorCallout>{siret.message}</ErrorCallout>
    const getDealerStockUseCase = createShowDealerStockUseCase(stockRepository)
    const result = await getDealerStockUseCase({siret})
    if(!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    return <div>
        <List>
            {
                result.value.map(stock=>(
                    <ListItem link={"/inventory-spare-parts/"+stock.sparePartReference}>
                        {stock.sparePartReference} - {stock.quantity}
                    </ListItem>
                ))
            }
        </List>
        <AddOrRemoveSpareFromStockForm siret={siretString}/>
    </div>
}