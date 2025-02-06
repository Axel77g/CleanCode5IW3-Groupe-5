"use client"

import {useRouter} from "next/navigation";
import {unregisterCustomerAction, UnregisterCustomerActionState} from "@/app/customers/[customerId]/actions";
import {Button} from "@/components/Button";

export function UnregisterCustomerButton(props: { customerIdString: string }) {
    const router = useRouter()

    const state : UnregisterCustomerActionState = {
        customerIdString: props.customerIdString,
        message:"",
        success:true
    }

    async function handleClick() {
        await unregisterCustomerAction(state)
        router.push("/customers")
    }

    return <Button onClick={handleClick}>
        Supprimer le client
    </Button>
}
