"use client";

import {Form} from "@/components/Form";
import {useRef} from "react";
import Input from "@/components/Input";
import {Button} from "@/components/Button";
import {useActionState} from "react";
import {updateCustomerAction} from "@/app/customers/[customerId]/actions";
import {UnregisterCustomerButton} from "@/app/customers/[customerId]/UnregisterCustomerButton";
import {useDialog} from "@/hooks/useDialog";
import {AssignVehiculeDialog} from "@/app/customers/[customerId]/AssignVehiculeDialog";

interface CustomerPatchFormProps {
    customerId?: string;
    name?: string | undefined;
    phoneNumber?: string | undefined;
    email?: string | undefined;
    address?: {
        city?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
        street?: string | undefined;
    };
    // vehiculeImmatriculations: [] | undefined
}

interface ActionState extends CustomerPatchFormProps {
    message: string,
    success: boolean
}

const initialState = {
    message: "",
    success: false
}

export default function CustomerPatchForm({customer}: { customer: CustomerPatchFormProps }) {
    const [state, formAction] = useActionState<ActionState, FormData>(updateCustomerAction, initialState)
    const customerSelected = useRef(null);
    const [isOpen, open, close] = useDialog();

    function handleAssignVehiculeClick(event) {
        event.stopPropagation()
        open()
    }

    return (
        <>
            <Form state={state} action={formAction} title={"Modifier un client"}>
                <input type={"hidden"} name={"customerId"} value={customer.customerId}/>
                <div className="flex justify-between gap-4">
                    <div className="w-1/2">
                        <Input type="text" name="name" value={state?.name ?? customer.name} label={"Nom"}
                               placeholder={"John DOE"}/>
                        <Input type="text" name="phoneNumber" label={"Numéro de téléphone"}
                               placeholder={"01.02.03.04.05"}
                               value={state?.phoneNumber ?? customer.phoneNumber}/>
                        <Input type="text" name="email" label={"Email"} value={state?.email ?? customer.email}
                               placeholder={"johndoe@placeholder.com"}/>
                    </div>
                    <div className="w-1/2 border-l pl-4">
                        <h2 className="font-semibold mb-2">Adresse</h2>
                        <Input placeholder={"Pays (code Pays)"} label={"Pays"} name={"address.country"} type={"text"}
                               value={state?.address?.country ?? customer?.address?.country}/>
                        <Input placeholder={"Ville"} label={"Ville"} name={"address.city"} type={"text"}
                               value={state?.address?.city ?? customer?.address?.city}/>
                        <Input placeholder={"Code postal"} label={"Code Postal"} name={"address.postalCode"}
                               type={"text"}
                               value={state?.address?.postalCode ?? customer?.address?.postalCode}/>
                        <Input placeholder={"Rue"} label={"Rue"} name={"address.street"} type={"text"}
                               value={state?.address?.street ?? customer?.address?.street}/>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button>Modifier le client</Button>
                    <AssignVehiculeDialog isOpen={isOpen} onClose={close} customer={customer}/>
                </div>
            </Form>
            <div className={"mt-5"}>
                <Button onClick={handleAssignVehiculeClick}>Assigner un véhicule</Button>
            </div>
        </>
    )
}