"use client";

import {Button} from "@/components/Button";
import {useDialog} from "@/hooks/useDialog";
import {AssignBreakdownDialog} from "@/app/vehicules/[immatriculation]/breakdowns/AssignBreakdownDialog";

export function AssignVehiculeBreakdownForm({vehiculeBreakdownId, immatriculation}: {vehiculeBreakdownId: string, immatriculation: string}) {
    const [isOpen, open, close] = useDialog();

    return <>
        <Button variant={"add"} onClick={open} className={"w-fit"}>Assigner à une maintenance</Button>
        <AssignBreakdownDialog isOpen={isOpen} onClose={close} vehiculeBreakdownId={vehiculeBreakdownId} immatriculation={immatriculation}/>
    </>
}