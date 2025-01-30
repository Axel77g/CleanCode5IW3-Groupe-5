"use client";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import Input from "@/components/Input";
import { useActionState } from "react";
import { updateCustomerAction } from "./actions";

interface CustomerUpdateFormProps {
  customerId?: string;
  name?: string | undefined;
  phoneNumber?: string | undefined;
  email?: string | undefined;
}

interface ActionState extends CustomerUpdateFormProps {
  message: string;
  success: boolean;
}

const initialState = {
  message: "",
  success: false,
};

export default function CustomerUpdateForm({
  customer,
}: {
  customer: CustomerUpdateFormProps;
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(
    updateCustomerAction,
    initialState
  );
  return (
    <Form state={state} title={"Profil conducteur"} action={formAction}>
      <input type={"hidden"} name={"customerId"} value={customer.customerId} />
      <Input
        type="text"
        name="name"
        value={state?.name ?? customer.name}
        label={"Prénom"}
        placeholder={"Prénom du conducteur"}
      />
      <Input
        type="text"
        name="email"
        value={state?.email ?? customer.email}
        label={"Email"}
        placeholder={"example@email.com"}
      />
      <Button>Modifier le client</Button>
    </Form>
  );
}
