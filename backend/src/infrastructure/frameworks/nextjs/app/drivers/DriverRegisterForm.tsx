"use client";
import {useActionState} from "react";
import {registerDriverAction} from "@/app/drivers/actions";
import Input from "@/components/Input";
import {Button} from "@/components/Button";

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
    const [state, formAction] = useActionState<ActionState>(registerDriverAction,initialState)
    return(
        <form action={formAction}>
            <h1 className={"text-xl font-semibold"}>Ajouter un conducteur</h1>
            <Input type="text" name="firstName" placeholder={"Prénom"} value={state.firstName}/>
            <Input type="text" name="lastName" placeholder={"Nom de famille"} value={state.lastName}/>
            <Input type="text" name="email" placeholder={"Email"} value={state.email}/>
            <Input type="text" name="driverLicenseId" placeholder={"Numéro du permis de conduire"} value={state.driverLicenseId}/>
            <Input type="datetime-local" name="driverLicensedAt" placeholder={"Obtention du permis de conduire"} value={state.driverLicensedAt}/>
            <Button>Ajouter un conducteur</Button>
            <small className={["block",state.success ? "" : "text-red-500"].join(' ')}>
                {state.message || ""}
            </small>
        </form>
    )
}