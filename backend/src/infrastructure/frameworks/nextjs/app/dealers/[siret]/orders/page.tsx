import {Siret} from "@domain/shared/value-object/Siret";
import {ErrorCallout} from "@/components/ErrorCallout";
import {createShowOrderHistoryUseCase} from "@application/inventoryManagement/usecases/order/ShowOrderHistoryUseCase";
import {createShowDealerUseCase} from "@application/inventoryManagement/usecases/dealer/ShowDealerUseCase";
import {dealerRepository} from "@infrastructureCore/repositories/inventoryManagement/dealerRepository";
import {orderRepository} from "@infrastructureCore/repositories/inventoryManagement/orderRepository";
import RegisterOrderForm from "@/app/dealers/[siret]/orders/RegisterOrderForm";
import HeadingTile from "@/components/HeadingTitle";
import {Order} from "@domain/inventoryManagement/entities/Order";
import {ListOrders} from "@/app/dealers/[siret]/orders/ListOrders";

export default async function DealerOrderPage(pageProps: { params: Promise<{siret: string}>}){
    const {siret : siretString} = await pageProps.params;
    const siret = Siret.create(siretString);
    if(siret instanceof Error) return <ErrorCallout>{siret.message}</ErrorCallout>
    const showOrdersHistoryUseCase = createShowOrderHistoryUseCase(createShowDealerUseCase(dealerRepository), orderRepository)
    const ordersHistory = await showOrdersHistoryUseCase({siret})
    if(!ordersHistory.success) return <ErrorCallout>{ordersHistory.error.message}</ErrorCallout>

    function getOrderDTO(order : Order) : any {
        return JSON.parse(JSON.stringify(order))
    }

    return <div>
        <HeadingTile>Commandes du concessionnaire {siret.getValue()}</HeadingTile>
        <ListOrders orders={ordersHistory.value.map((order)=> getOrderDTO(order))} siretString={siretString}/>
        <br/>
        <RegisterOrderForm siret={siretString}/>
    </div>
}
