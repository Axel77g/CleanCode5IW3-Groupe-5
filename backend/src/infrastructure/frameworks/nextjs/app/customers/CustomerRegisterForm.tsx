"use client";

import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import Input from "@/components/Input";
import { useActionState } from "react";
import { registerCustomer } from "./actions";

interface CustomerRegisterFormProps {
  name?: string | undefined;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  address?: {
    city?: string | undefined;
    country?: string | undefined;
    postalCode?: string | undefined;
    street?: string | undefined;
  };
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
  const [state, formAction] = useActionState<ActionState, FormData>(
    registerCustomer,
    initialState
  );

  return (
    <Form action={formAction} title={"Ajouter un client"} state={state}>
      <Input
        type="text"
        label={"Nom"}
        name="name"
        placeholder={"Nom du client"}
        value={state.name}
      />
      <Input
        placeholder={"Téléphone"}
        label={"Téléphone"}
        name={"phoneNumber"}
        type={"phone"}
        value={state.phoneNumber}
      />
      <Input
        placeholder={"Email"}
        label={"Email"}
        name={"email"}
        type={"email"}
        value={state.email}
      />
      <div>
        <hr />
        <br />
        <h2>Adresse</h2>
        <Input
          placeholder={"Pays (code Pays)"}
          label={"Pays"}
          name={"address.country"}
          type={"text"}
          value={state?.address?.country}
        />
        <Input
          placeholder={"Ville"}
          label={"Ville"}
          name={"address.city"}
          type={"text"}
          value={state?.address?.city}
        />
        <Input
          placeholder={"Code postal"}
          label={"Code Postal"}
          name={"address.postalCode"}
          type={"text"}
          value={state?.address?.postalCode}
        />
        <Input
          placeholder={"Rue"}
          label={"Rue"}
          name={"address.street"}
          type={"text"}
          value={state?.address?.street}
        />
      </div>
      <Button>Ajouter un client</Button>
    </Form>
  );
}
