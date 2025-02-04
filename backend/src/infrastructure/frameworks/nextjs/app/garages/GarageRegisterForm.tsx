"use client";

import {useActionState} from "react";
import {registerGarageAction} from "@/app/garages/actions";
import Input from "@/components/Input";
import {Button} from "@/components/Button";
import {Form} from "@/components/Form";


interface GarageRegisterFormProps {
    siret?: string,
    name?: string,
    phoneNumber?: string,
    address?: {
        city?: string | undefined,
        country?: string | undefined
        postalCode?: string | undefined
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
        <Form action={formAction} title={"Ajouter un garage"} state={state}>
            <div className="flex justify-between gap-4">
                <div className="w-1/2">
                    <Input type="text" label={"Siret"} name="siret" placeholder={"Siret du garage"}
                           value={state.siret}/>
                    <Input type="text" label={"Nom"} name="name" placeholder={"Nom du garage"} value={state.name}/>
                    <Input type="text" label={"Téléphone"} name="phoneNumber" placeholder={"Téléphone du garage"}
                           value={state.phoneNumber}/>
                </div>
                <div className="w-1/2 border-l pl-4">
                    <label className="block font-semibold text-lg text-gray-700 pb-3">Adresse</label>
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