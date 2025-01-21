"use client";
import {useActionState} from "react";
import {registerDriverAction} from "@/app/drivers/actions";
import Input from "@/components/Input";
import {Button} from "@/components/Button";
import {Form} from "@/components/Form";

interface DriverRegisterFormProps {
    driverLicenseId ?: string,
    firstName ?: string | undefined
    lastName ?: string | undefined,
    email ?: string | undefined
    driverLicensedAt ?: string | undefined
}

interface ActionState  extends DriverRegisterFormProps{
    message: string,
    success: boolean
}

const initialState = {
    message: "",
    success: false
}

export default function DriverRegisterForm(){
    const [state, formAction] = useActionState<ActionState,FormData>(registerDriverAction,initialState)
    return(
        <Form state={state} action={formAction} title={"Ajouter un conducteur"}>
            <Input type="text" name="firstName" value={state.firstName}  label={"Prénom"} placeholder={"Prénom du conducteur"}/>
            <Input type="text" name="lastName" label={"Nom de famille"} placeholder={"Nom de famille du conduteur"} value={state.lastName}/>
            <Input type="text" name="email" label={"Email"} value={state.email} placeholder={"email@example.com"}/>
            <Input type="text" name="driverLicenseId" placeholder={"Numéro du permis de conduire"} label={"Numéro du permis de conduire"} value={state.driverLicenseId}/>
            <Input type="datetime-local" name="driverLicensedAt" placeholder={"Obtention du permis de conduire"} label={"Obtention du permis de conduire"} value={state.driverLicensedAt}/>
            <Button>Ajouter un conducteur</Button>
        </Form>
    )
}