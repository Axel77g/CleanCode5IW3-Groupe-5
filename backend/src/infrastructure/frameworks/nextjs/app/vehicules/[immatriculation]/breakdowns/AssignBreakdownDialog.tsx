"use client";
import {useActionState, useEffect, useState} from "react";
import {Form} from "@/components/Form";
import {Button} from "@/components/Button";
import Select from "@/components/Select";
import {Dialog} from "@/components/Dialog";
import HeadingTile from "@/components/HeadingTitle";
import {assignVehiculeBreakdownToMaintenance} from "@/app/vehicules/[immatriculation]/breakdowns/action";

const initialState = {
    message : "",
    success : false
}

export function AssignBreakdownDialog(props: {isOpen: boolean, vehiculeBreakdownId: any, immatriculation: string,  onClose: () => void}) {
    const [state, action] = useActionState(assignVehiculeBreakdownToMaintenance, initialState)
    const [breakdowns, setBreakdowns] = useState<{ title: string; value: string }[]>([]);

    useEffect(() => {
        const fetchBreakdowns = async () => {
            try {
                const response = await fetch(`/api/maintenances?immatriculation=${props.immatriculation}`);
                console.log(response);
                if (!response.ok) throw new Error("Erreur lors de la récupération des pannes.");
                const data = await response.json();
                const formattedBreakdowns = data.map((breakdown: any) => ({
                    title: breakdown.description,
                    value: breakdown.vehiculeBreakdownId,
                }));
                setBreakdowns(formattedBreakdowns)
            } catch (e) {
                console.error(e)
            }
        };

        fetchBreakdowns();
    }, []);

    if (!props.vehiculeBreakdownId) return null;
    return <Dialog isOpen={props.isOpen} onClose={props.onClose}>
        <HeadingTile>Véhicule</HeadingTile>
        <Form action={action} title={"Assigner une panne"} state={state}>
            <input type={"hidden"} name={"vehiculeBreakdownId"} value={props.vehiculeBreakdownId}/>
            <Select name={"breakdownId"} label={"Panne"} options={breakdowns}/>
            <Button>Assigner</Button>
        </Form>
    </Dialog>
}