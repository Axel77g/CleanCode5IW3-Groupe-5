"use client"

import {useActionState} from "react";
import Input from "@/components/Input";
import {Form} from "@/components/Form";
import {Button} from "@/components/Button";
import {registerVehicleBreakdown} from "@/app/vehicles/[immatriculation]/breakdowns/action";

export interface VehicleBreakdownFormPayload {
    vehicleBreakdownId?: string,
    vehicleImmatriculation?: string,
    description?: string,
    date?: string,
}

export interface ActionState extends VehicleBreakdownFormPayload {
    message: string,
    success: boolean
}

const initialState: ActionState = {
    message: "",
    success: true
}

export default function VehicleBreakdownsForm(props: { vehicleImmatriculation: string }) {
    const [formState, formAction] = useActionState<ActionState, FormData>(registerVehicleBreakdown, initialState)
    return <Form state={formState} title={"Ajouter une panne"} action={formAction}>
        <input type="hidden" name={"vehicleImmatriculation"} value={props.vehicleImmatriculation} />
        <Input placeholder={"Description de la panne"} label={"Description"} name={"description"} type={"textarea"} /> {/* Le type est 'textarea' ici */}
        <Input type="date" name="date" placeholder={"Date de la panne"} value={formState.date} label={"Date de la panne"} />
        <Button variant={"submit"}>Ajouter la panne</Button>
    </Form>
}
