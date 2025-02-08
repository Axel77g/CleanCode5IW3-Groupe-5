"use client";
import {useActionState, useEffect, useState} from "react";
import {Form} from "@/components/Form";
import {Button} from "@/components/Button";
import Select from "@/components/Select";
import {Dialog} from "@/components/Dialog";
import HeadingTile from "@/components/HeadingTitle";
import {assignVehicleBreakdownToMaintenance} from "@/app/vehicles/[immatriculation]/breakdowns/action";

const initialState = {
    message : "",
    success : false
}

export function AssignBreakdownDialog(props: {isOpen: boolean, vehicleBreakdownId: any, immatriculation: string,  onClose: () => void}) {
    const [state, action] = useActionState(assignVehicleBreakdownToMaintenance, initialState)
    const [breakdowns, setBreakdowns] = useState<{ title: string; value: string }[]>([]);

    useEffect(() => {
        const fetchBreakdowns = async () => {
            try {
                const response = await fetch(`/api/maintenances?immatriculation=${props.immatriculation}`);
                if (!response.ok) throw new Error("Erreur lors de la récupération des pannes.");
                const data = await response.json();
                const formattedBreakdowns = data.map((breakdown: any) => ({
                    title: new Date(breakdown.date).toLocaleDateString() + " - #" + breakdown.maintenanceId,
                    value: breakdown.maintenanceId,
                }));
                setBreakdowns(formattedBreakdowns)
            } catch (e) {
                console.error(e)
            }
        };

        fetchBreakdowns();
    }, []);

    if (!props.vehicleBreakdownId) return null;
    return <Dialog isOpen={props.isOpen} onClose={props.onClose}>
        <HeadingTile>Véhicule #{props.immatriculation}</HeadingTile>
        <Form action={action} title={"Assigner à une maintenance"} state={state}>
            <input type={"hidden"} name={"vehicleBreakdownId"} value={props.vehicleBreakdownId}/>
            <Select name={"maintenanceId"} label={"Maintenance"} options={breakdowns}/>
            <Button variant={"submit"}>Assigner</Button>
        </Form>
    </Dialog>
}