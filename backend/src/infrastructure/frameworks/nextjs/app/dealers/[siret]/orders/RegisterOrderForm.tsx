"use client";

import {Form} from "@/components/Form";
import React, {useActionState, useEffect, useRef, useState} from "react";
import Input from "@/components/Input";
import {Button} from "@/components/Button";
import {registerOrder} from "@/app/dealers/[siret]/orders/actions";
import {ActionResponse} from "@/hooks/useServerForm";
import Chip from "@/components/Chip";
import ReferenceSelector from "@/components/ReferenceSelector";

interface OrderLineForm{
    reference : string,
    quantity : string,
    unitPrice : string,
}

const initialState = {
    message: "",
    success: false
}

export default function RegisterOrderForm(props: { siret : string}){
    const [state, action] = useActionState<ActionResponse,FormData>(registerOrder,initialState)
    const [orderLines, setOrderLines] = useState<OrderLineForm[]>([])
    function handleAddOrderLine(event : any){
        event.preventDefault()
        const temp = [...orderLines]
        temp.push({
            reference: "",
            quantity: "1",
            unitPrice: "0"
        })
        setOrderLines(temp)
    }

    function handleRemoveOrderLine(index : number){
        const temp = [...orderLines]
        temp.splice(index, 1)
        setOrderLines(temp)
    }

    return <Form action={action} title={"Enregistrer une commande passée"} state={state}>
        <input type="hidden" value={props.siret} name={"dealerSiret"}/>
        <Input placeholder={"Date de livraison"} label={"Date de livraison"} name={"deliveryDate"} type={"date"}/>
        <Input placeholder={"Date de commande"} label={"Date de commande"} name={"orderedDate"} type={"date"}/>
        {
            orderLines.map((orderLine, index) => <OrderLineForm index={index} key={orderLine.reference + index} orderLine={orderLine} onChange={(orderLine) => {
                const temp = [...orderLines]
                temp[index] = orderLine
                setOrderLines(temp)
            } } onDelete={()=>handleRemoveOrderLine(index)}/>)
        }
        <Button onClick={handleAddOrderLine}>Ajouter une ligne</Button>
        <Button >Submit</Button>
    </Form>
}

function OrderLineForm(props: {index: number,orderLine : OrderLineForm, onChange : (orderLine : OrderLineForm) => void, onDelete ?: (...args : [any]) => void}){

    function handleChange(e : React.ChangeEvent<HTMLInputElement>){
        props.onChange({
            ...props.orderLine,
            [e.target.name]: e.target.value
        })
    }

    return <div className={"border-solid border-[1px] border-slate-300 rounded p-4 my-2"}>
        <ReferenceSelector  label={"Pièce détachée"} reference={props.orderLine.reference}  onChange={(reference) => props.onChange({...props.orderLine, reference})}/>
        <input name={`orderLines[${props.index}].reference`} type={"hidden"} value={props.orderLine.reference} onChange={handleChange} />
        <Input placeholder={"Quantité"} label={"Quantité"} name={`orderLines[${props.index}].quantity`} type={"number"} value={props.orderLine.quantity} onChange={handleChange} />
        <Input placeholder={"Prix unitaire"} label={"Prix unitaire"} name={`orderLines[${props.index}].unitPrice`} type={"number"} value={props.orderLine.unitPrice} onChange={handleChange} />
        <Button onClick={props.onDelete}>Retirer</Button>
    </div>
}

