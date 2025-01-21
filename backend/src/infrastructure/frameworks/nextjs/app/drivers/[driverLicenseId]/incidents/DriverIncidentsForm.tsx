"use client"
import {useActionState} from "react";
import {IncidentType} from "@domain/testDrive/enums/IncidentType";
import {registerDriverIncident} from "@/app/drivers/[driverLicenseId]/actions";
import {ActionResponse} from "@/hooks/useServerForm";
import Input from "@/components/Input";
import Select from "@/components/Select";
import {Button} from "@/components/Button";

export interface DriverIncidentsFormPayload {
    driverLicenseId ?: string,
    description?: string,
    date?: string ,
    type?: IncidentType
}

export interface ActionState extends DriverIncidentsFormPayload{
    message  : string,
    success: boolean
}

const initialState: ActionState = {
    message: "",
    success: true
}

const incidentTypes = [
    {
        title: "Accident",
        value: IncidentType.ACCIDENT
    },
    {
        title: "Panne",
        value: IncidentType.BREAKDOWN
    },
    {
        title: "Autre",
        value:  IncidentType.OTHER,
    },
    {
        title: "Vol",
        value: IncidentType.THEFT
    }
]

export default function DriverIncidentsForm(props : {driverLicenseId : string}){
    const [formState, formAction] = useActionState<ActionState>(registerDriverIncident,initialState)
    return <form action={formAction}>
        <input type="hidden" name={"driverLicenseId"} value={props.driverLicenseId}/>
        <Input placeholder={"Description de l'incident"} label={"Description"} name={"description"} type={"text"} />
        <Select name={"type"}  options={incidentTypes}  label={"Type de l'incident"}/>
        <Input type="datetime-local" name="date" placeholder={"Date de l'incident"} value={formState.date} label={"Date de l'incident"}/>
        <Button>Ajouter l'incident</Button>
        <small className={["block",formState.success ? "" : "text-red-500"].join(' ')}>
            {formState.message || ""}
        </small>
    </form>
}