"use client";

import {useRef} from "react";
import {useDialog} from "@/hooks/useDialog";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import {Button} from "@/components/Button";
import {OrderStatusDialog} from "@/app/dealers/[siret]/orders/OrderStatusDialog";

export function ListOrders(props: {orders : any[], siretString : string}){

    const orderSelected = useRef(null)
    const [isOpen,open, close] = useDialog();
    function handleUpdateStatusOrderClick(order: any){
        orderSelected.current = order
        open()
    }

    return <>
        <List>
            {
                props.orders.map(order=>(
                    <ListItem key={order.orderId} link={`/dealers/${props.siretString}/orders`}>
                        {order.orderId} - {order.orderedAt} - {order.status} - <Button onClick={() => handleUpdateStatusOrderClick(order)}>Modifier le status</Button>
                        </ListItem>
                    ))
            }
        </List>
        <OrderStatusDialog isOpen={isOpen} onClose={close} order={orderSelected.current}/>
    </>
}