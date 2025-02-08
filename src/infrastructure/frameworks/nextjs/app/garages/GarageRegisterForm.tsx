"use client";
import {Form} from "@/components/Form";
import {useActionState} from "react";
import {registerGarageAction} from "@/app/garages/actions";
import Input from "@/components/Input";
import {Button} from "@/components/Button";

interface GarageRegisterFormProps {
    siret?: string,
    name?: string | undefined,
    phoneNumber?: string | undefined,
    address?: {
        city?: string | undefined,
        country?: string | undefined,
        postalCode?: string | undefined,
        street?: string | undefined
    }
}

interface ActionState extends GarageRegisterFormProps {
    message: string,
    success: boolean
}

const initialState = {
    message: "",
    success: false
}

export default function GarageRegisterForm() {
    const [state, formAction] = useActionState<ActionState, FormData>(registerGarageAction, initialState)

    return (
        <Form action={formAction} title={"Ajouter une concession"} state={state}>
            <div className="flex justify-between gap-4">
                <div className="w-1/2">
                    <Input type="text" label={"Siret"} name="siret" placeholder={"Siret de la concession"}
                           value={state.siret}/>
                    <Input type="text" label={"Nom du garage"} name="name" placeholder={"Nom de la concession"} value={state.name}/>
                    <Input placeholder={"Téléphone"} label={"Téléphone"} name={"phoneNumber"} type={"phone"}
                           value={state.phoneNumber}/>
                </div>
                <div className="w-1/2 border-l pl-4">
                    <hr/>
                    <br/>
                    <h2>Adresse</h2>
                    <Input placeholder={"Pays (code Pays)"} label={"Pays"} name={"address.country"} type={"text"}
                           value={state?.address?.country}/>
                    <Input placeholder={"Ville"} label={"Ville"} name={"address.city"} type={"text"}
                           value={state?.address?.city}/>
                    <Input placeholder={"Code postal"} label={"Code Postal"} name={"address.postalCode"} type={"text"}
                           value={state?.address?.postalCode}/>
                    <Input placeholder={"Rue"} label={"Rue"} name={"address.street"} type={"text"}
                           value={state?.address?.street}/>
                </div>
            </div>
            <Button>Ajouter un garage</Button>
        </Form>
    )
}