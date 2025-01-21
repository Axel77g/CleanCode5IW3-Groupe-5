"use client";

import {unregisterDealerAction, UnregisterDealerActionState} from "@/app/dealers/[siret]/actions";
import {Button} from "@/components/Button";
import {useRouter} from "next/navigation";

export function UnregisterActionButton(props: { siretString: string }) {
    const router = useRouter()

    const state : UnregisterDealerActionState = {
        siretString: props.siretString,
        message:"",
        success:true
    }

    async function handleClick(){
        await unregisterDealerAction(state)
        router.push("/dealers")
    }

    return <Button onClick={handleClick}>
        Supprimer la concession
    </Button>
}