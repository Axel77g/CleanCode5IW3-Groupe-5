"use client"

import {useRouter} from "next/navigation";
import {unregisterVehiculeUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/vehicule/unregisterVehiculeUseCase";
import {Button} from "@/components/Button";
import {unregisterVehiculeAction, UnregisterVehiculeActionState} from "@/app/vehicules/[immatriculation]/actions";

export function UnregisterVehiculeActionButton(props : {immatriculationString: string}){
    const router = useRouter()

    const state : UnregisterVehiculeActionState = {
        immatriculationString: props.immatriculationString,
        message: "",
        success: true
    }

    async function handleClick() {
        await unregisterVehiculeAction(state)
        router.push("/vehicules")
    }

    return <Button onClick={handleClick} variant="danger">
        Supprimer le véhicule
    </Button>
}