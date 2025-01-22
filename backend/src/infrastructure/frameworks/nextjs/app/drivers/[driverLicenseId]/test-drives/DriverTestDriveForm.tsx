"use client"
import {useActionState} from "react";
import Input from "@/components/Input";
import {Button} from "@/components/Button";
import {Form} from "@/components/Form";
import {registerDriverTestDrive} from "@/app/drivers/[driverLicenseId]/test-drives/actions";

export interface DriverTestDrivePayload {
    driverLicenseId ?: string,
    vehicleImmatriculation?: string,
    period?:{
        startDate?: string ,
        endDate?: string
    }
}

export interface ActionState extends DriverTestDrivePayload{
    message  : string,
    success: boolean
}

const initialState: ActionState = {
    message: "",
    success: true
}


export default function DriverTestDriveForm(props : {driverLicenseId : string}){
    const [formState, formAction] = useActionState<ActionState,FormData>(registerDriverTestDrive,initialState)
    return <Form state={formState} action={formAction} title={"Ajouter un test de conduite"}>
        <input type="hidden" name={"driverLicenseId"} value={props.driverLicenseId}/>
        <Input placeholder={"Immatriculation du véhicule"} label={"Immatriculation"} name={"vehicleImmatriculation"} type={"text"} value={formState.vehicleImmatriculation} />
        <Input type="date" name="period.startDate" placeholder={"Date début du test"} value={formState?.period?.startDate} label={"Date début du test"}/>
        <Input type="date" name="period.endDate" placeholder={"Date début du test"} value={formState?.period?.endDate} label={"Date debut du test"}/>
        <Button>Ajouter le test de conduite</Button>
    </Form>
}