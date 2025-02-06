"use client"

import {useActionState} from "react";
import Input from "@/components/Input";
import {Form} from "@/components/Form";
import {Button} from "@/components/Button";
import {registerVehiculeBreakdown} from "@/app/vehicules/[immatriculation]/breakdowns/action";

export interface VehiculeBreakdownFormPayload {
    vehiculeBreakdownId?: string,
    vehiculeImmatriculation?: string,
    description?: string,
    date?: string,
}

export interface ActionState extends VehiculeBreakdownFormPayload {
    message: string,
    success: boolean
}

const initialState: ActionState = {
    message: "",
    success: true
}

export default function VehiculeBreakdownsForm(props: { vehiculeImmatriculation: string }) {
    const [formState, formAction] = useActionState<ActionState, FormData>(registerVehiculeBreakdown, initialState)
    return <Form state={formState} title={"Ajouter une panne"} action={formAction}>
        <input type="hidden" name={"vehiculeImmatriculation"} value={props.vehiculeImmatriculation} />
        <Input placeholder={"Description de la panne"} label={"Description"} name={"description"} type={"textarea"} /> {/* Le type est 'textarea' ici */}
        <Input type="date" name="date" placeholder={"Date de la panne"} value={formState.date} label={"Date de la panne"} />
        <Button>Ajouter la panne</Button>
    </Form>
}
