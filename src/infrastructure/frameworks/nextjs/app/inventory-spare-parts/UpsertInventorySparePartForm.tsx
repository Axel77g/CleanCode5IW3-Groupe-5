"use client";

import {useActionState} from "react";
import {upsertInventorySparePart} from "@/app/inventory-spare-parts/actions";
import {Form} from "@/components/Form";
import Input from "@/components/Input";
import {ActionResponse} from "@/hooks/useServerForm";
import {Button} from "@/components/Button";


interface PatchInventorySparePartFormState extends ActionResponse{
    reference ?: string
    name ?: string
}

let initialState : PatchInventorySparePartFormState = {
    message: "",
    success: false,
}

export function UpsertInventorySparePartForm(props: { reference ?: string, name ?: string }){
    if(props.name){
        initialState = {
            ...initialState,
            name: props.name
        }
    }
    const [state, action] = useActionState<PatchInventorySparePartFormState,FormData>(upsertInventorySparePart,initialState)
    const title = props.reference ? "Modifier la pièce" : "Ajouter une pièce"
    return <Form action={action} title={title} state={state}>
        <Input type={props.reference ? "hidden" : "text"} name={"reference"} value={props.reference || state.reference} label={"Reference"}  placeholder={"Reférence du produit"}/>
        <Input type={"text"} name={"name"} value={state.name} label={"Name"}  placeholder={"Nom du produit"}/>
        <Button>
            {props.reference ? "Modifier" : "Ajouter"}
        </Button>
    </Form>

}