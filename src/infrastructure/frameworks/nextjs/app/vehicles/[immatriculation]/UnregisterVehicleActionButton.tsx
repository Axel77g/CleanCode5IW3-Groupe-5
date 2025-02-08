"use client"

import {useRouter} from "next/navigation";
import {Button} from "@/components/Button";
import {unregisterVehicleAction, UnregisterVehicleActionState} from "@/app/vehicles/[immatriculation]/actions";

export function UnregisterVehicleActionButton(props : {immatriculationString: string}){
    const router = useRouter()

    const state : UnregisterVehicleActionState = {
        immatriculationString: props.immatriculationString,
        message: "",
        success: true
    }

    async function handleClick() {
        await unregisterVehicleAction(state)
        router.push("/vehicles")
    }

    return <Button onClick={handleClick} variant="danger">
        Supprimer le véhicule
    </Button>
}