"use client";
import {useActionState} from "react";
import {registerDriverAction} from "@/app/drivers/actions";
import Input from "@/components/Input";
import {Button} from "@/components/Button";

interface DealerRegisterFormProps {
    siret ?: string,
    name ?: string | undefined
    phoneNumber ?: string | undefined
    city ?: string | undefined,
    country ?: string | undefined
    zipCode ?: string | undefined
    street ?: string | undefined
}

interface ActionState  extends DealerRegisterFormProps{
    message: string,
    success: boolean
}

const initialState = {
    message: "",
    success: false
}

export default function DriverRegisterForm(){
    const [state, formAction] = useActionState<ActionState>(registerDriverAction,initialState)
    return(
        <form action={formAction}>
            <h1 className={"text-xl font-semibold"}>Ajouter un conducteur</h1>
            <Input type="text" label={"Siret"} name="siret" placeholder={"Siret de la concession"} value={state.siret}/>
            <Input type="text" label={"Raison social"} name="name" placeholder={"Nom de la concession"} value={state.name}/>
            <div>
                <h2>Adresse</h2>
                <Input placeholder={"Pays (code Pays)"}  label={"Pays"} name={"country"} type={"text"}/>
                <Input placeholder={"Ville"} label={"Ville"} name={"city"} type={"text"} />
                <Input placeholder={"Code postal"} label={"Code Postal"} name={"zipCode"} type={"text"} />
                <Input placeholder={"Rue"} label={"Rue"} name={"street"} type={"text"} />
            </div>
            <Input placeholder={"Téléphone"} label={"Téléphone"} name={"phoneNumber"} type={"phone"} />
            <Button>Ajouter une concession</Button>
            <small className={["block",state.success ? "" : "text-red-500"].join(' ')}>
                {state.message || ""}
            </small>
        </form>
    )
}