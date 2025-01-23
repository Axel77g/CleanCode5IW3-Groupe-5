"use client"
import {Dialog} from "@/components/Dialog";
import {useDialog} from "@/hooks/useDialog";
import {Button} from "@/components/Button";
import HeadingTile from "@/components/HeadingTitle";
import Select from "@/components/Select";
import {OrderStatusEnum} from "@domain/inventoryManagement/enums/OrderStatusEnum";
import {useActionState} from "react";
import {updateOrderStatus} from "@/app/dealers/[siret]/orders/actions";

const orderStatus = [
    {
        title: "En attente",
        value: OrderStatusEnum.PENDING
    },
    {
        title: "Terminé",
        value: OrderStatusEnum.COMPLETED
    },
    {
        title: "Annulé",
        value:  OrderStatusEnum.CANCELED
    },
    {
        title: "En cours de traitement",
        value: OrderStatusEnum.IN_PROGRESS
    }
]


const initialState = {
    message : "",
    success : false
}

export function OrderStatusDialog(props : {order : any}){
    const [isOpen, open, close] = useDialog()
    const [state , action] = useActionState(updateOrderStatus, initialState)

    console.log(action)
    return <div>
        <Button onClick={open}>Modifier</Button>
        <HeadingTile>Détail de Commande : #{props.order.orderId}</HeadingTile>
        <form action={action}>
            <Select  options={orderStatus} label={"Status de la commande"} value={props.order.status}  name={"status"}/>

            <p>
                {props.order.deliveredAt}
            </p>

            <p>
                {props.order.orderedAt}
            </p>
            {JSON.stringify(state)}
            <Button>
                Enregistrer
            </Button>
        </form>
        <Dialog isOpen={isOpen} onClose={close}>

        </Dialog>
    </div>
}