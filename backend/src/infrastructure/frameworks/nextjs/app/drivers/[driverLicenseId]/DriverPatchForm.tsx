"use client";
import {} from "@/app/drivers/actions";
import {useActionState} from "react";
import Input from "@/components/Input";
import {Button} from "@/components/Button";
import {patchDriverAction} from "@/app/drivers/[driverLicenseId]/actions";

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
    const [state, formAction] = useActionState<ActionState>(patchDriverAction,initialState)
    console.log(driver.driverLicensedAt?.toLocaleString())
    return(
        <form action={formAction}>
            <input type={"hidden"} name={"driverLicenseId"} value={driver.driverLicenseId}/>
            <Input type="text" name="firstName" value={state?.firstName ?? driver.firstName}/>
            <Input type="text" name="lastName" value={state?.lastName ?? driver.lastName}/>
            <Input type="text" name="email" value={state?.email ?? driver.email}/>
            <Input type="text" disabled={true} name="driverLicensedAt" placeholder={"Obtention du permis de conduire"} value={driver.driverLicensedAt?.toLocaleString()}/>
            <Button>Modifier le conducteur</Button>
            <small className={["block",state.success ? "" : "text-red-500"].join(' ')}>
                {state.message || ""}
            </small>
        </form>
    )
}