"use client";

import {useActionState} from "react";
import {unregisterDealerAction, UnregisterDealerActionState} from "@/app/dealers/[siret]/actions";
import {Button} from "@/components/Button";

export function UnregisterActionButton(props: { siretString: string }) {
    const state : UnregisterDealerActionState = {
        siretString: props.siretString,
        message:"",
        success:true
    }

    return <Button onClick={unregisterDealerAction(state)}>
        Supprimer la concession
    </Button>
}