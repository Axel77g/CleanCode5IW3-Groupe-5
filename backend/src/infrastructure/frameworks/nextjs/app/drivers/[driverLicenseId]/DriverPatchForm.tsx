"use client";
import {} from "@/app/drivers/actions";
import {useActionState} from "react";
import Input from "@/components/Input";
import {Button} from "@/components/Button";
import {patchDriverAction} from "@/app/drivers/[driverLicenseId]/actions";
import {Form} from "@/components/Form";

interface DriverPatchFormProps {
    driverLicenseId ?: string,
    firstName ?: string | undefined
    lastName ?: string | undefined,
    email ?: string | undefined
    driverLicensedAt ?: Date
}

interface ActionState extends DriverPatchFormProps{
    message: string,
    success: boolean
}

const initialState = {
    message: "",
    success: false
}
export default function DriverPatchForm({ driver } : {driver : DriverPatchFormProps}) {
    const [state, formAction] = useActionState<ActionState,FormData>(patchDriverAction,initialState)
    return(
        <Form state={state} title={"Profil conducteur"} action={formAction}>
            <input type={"hidden"} name={"driverLicenseId"} value={driver.driverLicenseId}/>
            <Input type="text" name="firstName" value={state?.firstName ?? driver.firstName} label={"Prénom"} placeholder={"Prénom du conducteur"}/>
            <Input type="text" name="lastName" value={state?.lastName ?? driver.lastName} label={"Nom de famille"} placeholder={"Nom de famille du conducteur"}/>
            <Input type="text" name="email" value={state?.email ?? driver.email} label={"Email"} placeholder={"example@email.com"}/>
            <Input type="text" label={"Email"} disabled={true} name="driverLicensedAt" placeholder={"Obtention du permis de conduire"} value={driver.driverLicensedAt?.toLocaleString()}/>
            <Button>Modifier le conducteur</Button>
        </Form>
    )
}