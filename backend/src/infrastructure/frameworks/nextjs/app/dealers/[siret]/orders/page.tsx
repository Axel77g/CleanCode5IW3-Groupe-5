import {Siret} from "@domain/shared/value-object/Siret";
import {ErrorCallout} from "@/components/ErrorCallout";
import {createShowOrderHistoryUseCase} from "@application/inventoryManagement/usecases/order/ShowOrderHistoryUseCase";
import {createShowDealerUseCase} from "@application/inventoryManagement/usecases/dealer/ShowDealerUseCase";
import {dealerRepository} from "@infrastructureCore/repositories/inventoryManagement/dealerRepository";
import {orderRepository} from "@infrastructureCore/repositories/inventoryManagement/orderRepository";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import Pagination from "@/components/Pagination";
import RegisterOrderForm from "@/app/dealers/[siret]/orders/RegisterOrderForm";
import HeadingTile from "@/components/HeadingTitle";

export default async function DealerOrderPage(pageProps: { params: Promise<{siret: string}>}){
    const {siret : siretString} = await pageProps.params;
    const siret = Siret.create(siretString);
    if(siret instanceof Error) return <ErrorCallout>{siret.message}</ErrorCallout>
    const showOrdersHistoryUseCase = createShowOrderHistoryUseCase(createShowDealerUseCase(dealerRepository), orderRepository)
    const ordersHistory = await showOrdersHistoryUseCase({siret})
    if(!ordersHistory.success) return <ErrorCallout>{ordersHistory.error.message}</ErrorCallout>
    return <div>
        <HeadingTile>Commandes du concessionnaire {siret.getValue()}</HeadingTile>
        <List>
            {
                ordersHistory.value.map(order=>(
                    <ListItem key={order.orderId} link={`/orders/${order.orderId}`}>
                        {order.orderId} - {order.orderedAt.toISOString()} - {order.status}
                    </ListItem>
                ))
            }
        </List>
        <br/>
        <RegisterOrderForm siret={siretString}/>
    </div>



}