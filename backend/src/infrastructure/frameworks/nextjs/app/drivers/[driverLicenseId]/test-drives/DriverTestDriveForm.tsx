"use client"
import {useActionState} from "react";
import { registerDriverTestDrive} from "@/app/drivers/[driverLicenseId]/actions";
import Input from "@/components/Input";
import {Button} from "@/components/Button";

export interface DriverTestDrivePayload {
    driverLicenseId ?: string,
    vehicleImmatriculation?: string,
    startDate?: string ,
    endDate?: string
}

export interface ActionState extends DriverTestDrivePayload{
    message  : string,
    success: boolean
}

const initialState: ActionState = {
    message: "",
    success: true
}


export default function DriverIncidentsForm(props : {driverLicenseId : string}){
    const [formState, formAction] = useActionState<ActionState>(registerDriverTestDrive,initialState)
    return <form action={formAction}>
        <input type="hidden" name={"driverLicenseId"} value={props.driverLicenseId}/>
        <Input placeholder={"Imatriculation du véhicule"} label={"Immatriculation"} name={"vehicleImmatriculation"} type={"text"} value={formState.vehicleImmatriculation} />
        <Input type="datetime-local" name="startDate" placeholder={"Date de l'incident"} value={formState.startDate}/>
        <Input type="datetime-local" name="endDate" placeholder={"Date de l'incident"} value={formState.endDate}/>
        <Button>Ajouter le test de conduite</Button>
        <small className={["block",formState.success ? "" : "text-red-500"].join(' ')}>
            {formState.message || ""}
        </small>
    </form>
}