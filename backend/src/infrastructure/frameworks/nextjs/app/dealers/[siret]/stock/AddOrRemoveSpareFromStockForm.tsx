"use client";

import {Form} from "@/components/Form";
import {useActionState} from "react";
import Input from "@/components/Input";
import {Button} from "@/components/Button";
import {updateDealerStock} from "@/app/dealers/[siret]/stock/actions";


const initialState = {
    message: "",
    success: false
}

export function AddOrRemoveSpareFromStockForm(props: {siret:string}){
    const [state, action] = useActionState(updateDealerStock,initialState)
    return <Form title={"Mettre a jour le stock"} action={action} state={state} >
        <input type={"hidden"} name={"siret"} value={props.siret}/>
        <Input placeholder={"Réference du produit"} label={"Réference du produit"} name={"sparePartReference"} type={"text"}/>
        <Input placeholder={"Quantité"} label={"Quantité"} name={"quantity"} type={"number"}/>
        <Button >Mettre a jour</Button>
    </Form>
}