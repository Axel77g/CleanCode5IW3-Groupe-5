"use client"
import {Button} from "@/components/Button";
import Select from "@/components/Select";
import {OrderStatusEnum} from "@domain/inventoryManagement/enums/OrderStatusEnum";
import {useActionState} from "react";
import { updateOrderStatus} from "./actions";
import {Form} from "@/components/Form";
import {Dialog} from "@/components/Dialog";
import HeadingTile from "@/components/HeadingTitle";
import {OrderLineDTO} from "@domain/inventoryManagement/value-object/OrderLine";

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
        <HeadingTile>Commande #{props.order.orderId}</HeadingTile>

        <p>
            Commandé le {props.order.orderedAt}
        </p>
        <p>
            Livraison le {props.order.deliveredAt}
        </p>
        <div className="my-5">
            <p className={"font-bold"}>
                Détails de la commande
            </p>

            <ul className={"ml-4 "}>
                {
                    props.order.lines.map((line : OrderLineDTO) => (
                        <li key={line.reference}>
                            #{line.reference} - {line.quantity} unité - {line.unitPrice * line.quantity}€ (unitaire
                            : {line.unitPrice}€)
                        </li>
                    ))
                }
            </ul>
        </div>

        <Form action={action} state={state} title={"Mettre a jour le status de la commande"}>
            <input name={"orderId"} type={"hidden"} value={props.order.orderId}/>
            <Select options={orderStatus} label={"Status de la commande"} name={"status"} value={props.order.status}/>


            <Button>
                Enregistrer
            </Button>
        </Form>
    </Dialog>
}