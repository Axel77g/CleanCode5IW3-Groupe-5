"use client"
import {Button} from "@/components/Button";
import Select from "@/components/Select";
import {OrderStatusEnum} from "@domain/inventoryManagement/enums/OrderStatusEnum";
import {useActionState} from "react";
import { updateOrderStatus} from "./actions";
import {Form} from "@/components/Form";
import {Dialog} from "@/components/Dialog";

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

export function OrderStatusDialog(props: {isOpen: boolean, order : any, onClose: () => void}){
    const [state, action] = useActionState(updateOrderStatus, initialState)
    if(!props.order) return null
    return <Dialog isOpen={props.isOpen} onClose={props.onClose}>
        <Form action={action}  state={state} title={"Mettre a jour le status de la commande"}>
            <input name={"orderId"} type={"hidden"} value={props.order.orderId}/>
            <Select  options={orderStatus} label={"Status de la commande"}  name={"status"} value={props.order.status}/>
            <p>
                {props.order.orderedAt}
            </p>
            <p>
                {props.order.deliveredAt}
            </p>

            <Button>
                Enregistrer
            </Button>
        </Form>
    </Dialog>
}