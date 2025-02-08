"use client";

import { useActionState } from "react";
import { registerCustomerAction } from "@/app/customers/actions";
import Input from "@/components/Input";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form";

interface CustomerRegisterFormProps {
    name?: string;
    phoneNumber?: string;
    email?: string;
    address?: {
        city?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
        street?: string | undefined;
    };
    // @TODO : Add vehiculeImmatriculations
}

interface ActionState extends CustomerRegisterFormProps {
    message: string;
    success: boolean;
}

const initialState = {
    message: "",
    success: false,
};

export default function CustomerRegisterForm() {
    const [state, formAction] = useActionState<ActionState, FormData>(registerCustomerAction, initialState);
    return (
        <Form state={state} action={formAction} title={"Ajouter un client"}>
            <div className="flex justify-between gap-4">
                <div className="w-1/2">
                    <Input type="text" name="name" value={state.name} label={"Nom"} placeholder={"John DOE"} />
                    <Input type="text" name="phoneNumber" label={"Numéro de téléphone"} placeholder={"01.02.03.04.05"} value={state.phoneNumber} />
                    <Input type="text" name="email" label={"Email"} value={state.email} placeholder={"johndoe@placeholder.com"} />
                </div>
                <div className="w-1/2 border-l pl-4">
                    <h2 className="font-semibold mb-2">Adresse</h2>
                    <Input placeholder={"Pays (code Pays)"} label={"Pays"} name={"address.country"} type={"text"} value={state?.address?.country} />
                    <Input placeholder={"Ville"} label={"Ville"} name={"address.city"} type={"text"} value={state?.address?.city} />
                    <Input placeholder={"Code postal"} label={"Code Postal"} name={"address.postalCode"} type={"text"} value={state?.address?.postalCode} />
                    <Input placeholder={"Rue"} label={"Rue"} name={"address.street"} type={"text"} value={state?.address?.street} />
                </div>
            </div>
            <Button>Ajouter un client</Button>
        </Form>
    );
}
