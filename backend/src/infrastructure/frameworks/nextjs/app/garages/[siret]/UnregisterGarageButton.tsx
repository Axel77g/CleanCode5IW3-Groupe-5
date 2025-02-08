"use client"

import {Button} from "@/components/Button";
import {useRouter} from "next/navigation";
import {unregisterGarageAction, UnregisterGarageActionState} from "@/app/garages/[siret]/actions";

export function UnregisterGarageButton(props: { siretString: string }) {
    const router = useRouter()

    const state : UnregisterGarageActionState = {
        siretString: props.siretString,
        message:"",
        success:true
    }

    async function handleClick() {
        await unregisterGarageAction(state)
        router.push("/garages")
    }

    return <Button onClick={handleClick} variant="danger">
        Supprimer le garage
    </Button>
}