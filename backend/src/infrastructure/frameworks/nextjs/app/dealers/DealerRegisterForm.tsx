"use client";
import {useActionState} from "react";
import Input from "@/components/Input";
import {Button} from "@/components/Button";
import {registerDealer} from "@/app/dealers/actions";
import {Form} from "@/components/Form";

interface DealerRegisterFormProps{
    siret ?: string,
    name ?: string | undefined
    phoneNumber ?: string | undefined
    address ?: {
        city ?: string | undefined,
        country ?: string | undefined
        postalCode ?: string | undefined
        street ?: string | undefined
    }
}

interface ActionState extends DealerRegisterFormProps{
    message: string,
    success: boolean
}

const initialState = {
    message: "",
    success: false
}

export default function DealerRegisterForm(){
    const [state, formAction] = useActionState<ActionState,FormData>(registerDealer,initialState)


    return(
        <Form action={formAction} title={"Ajouter une concession"} state={state}>
            <Input type="text" label={"Siret"} name="siret" placeholder={"Siret de la concession"} value={state.siret}/>
            <Input type="text" label={"Raison social"} name="name" placeholder={"Nom de la concession"} value={state.name}/>
            <Input placeholder={"Téléphone"} label={"Téléphone"} name={"phoneNumber"} type={"phone"} value={state.phoneNumber}/>
            <div>
                <hr/>
                <br/>
                <h2>Adresse</h2>
                <Input placeholder={"Pays (code Pays)"} label={"Pays"} name={"address.country"} type={"text"} value={state?.address?.country}/>
                <Input placeholder={"Ville"} label={"Ville"} name={"address.city"} type={"text"} value={state?.address?.city}/>
                <Input placeholder={"Code postal"} label={"Code Postal"} name={"address.postalCode"} type={"text"} value={state?.address?.postalCode}/>
                <Input placeholder={"Rue"} label={"Rue"} name={"address.street"} type={"text"} value={state?.address?.street}/>
            </div>
            <Button>Ajouter une concession</Button>
        </Form>
    )
}