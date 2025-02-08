import {ErrorCallout} from "@/components/ErrorCallout";
import RegisterOrderForm from "@/app/dealers/[siret]/orders/RegisterOrderForm";
import HeadingTile from "@/components/HeadingTitle";
import {Order} from "@domain/inventoryManagement/entities/Order";
import {ListOrders} from "@/app/dealers/[siret]/orders/ListOrders";
import {
    showOrderHistoryUseCase
} from "@infrastructureCore/useCaseImplementation/InventoryManagement/showOrderHistoryUseCase";

export default async function DealerOrderPage(pageProps: { params: Promise<{siret: string}>}){
    const {siret } = await pageProps.params;
    const result = await showOrderHistoryUseCase({siret})
    if(!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    function getOrderDTO(order : Order) : any {
        return {
            ...JSON.parse(JSON.stringify(order)),
            totalPrice : order.totalPrice.getFormattedValue(),
        }
    }
    return <div>
        <HeadingTile>Commandes du concessionnaire {siret}</HeadingTile>
        <ListOrders orders={result.value.map((order)=> getOrderDTO(order))} siretString={siret}/>
        <br/>
        <RegisterOrderForm siret={siret}/>
    </div>
}
