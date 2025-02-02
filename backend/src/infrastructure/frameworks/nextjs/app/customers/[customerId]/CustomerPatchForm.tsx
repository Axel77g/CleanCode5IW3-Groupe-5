"use client";
import { Form } from "@/components/Form";
import { useActionState } from "react";
import { updateCustomerAction } from "./actions";

interface CustomerUpdateFormProps {
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
    <Form state={state} title={"Profil client"} action={formAction}>
      <input type={"hidden"} name={"customerId"} value={customer.customerId} />
      <input type="text" name="name" value={state?.name ?? customer.name} />
      <input
        type="text"
        name="phoneNumber"
        value={state?.phoneNumber ?? customer.phoneNumber}
      />
      <input type="text" name="email" value={state?.email ?? customer.email} />
      <input
        type="text"
        name="address.city"
        value={state?.address?.city ?? customer.address.city}
      />
      <input
        type="text"
        namezcountry"
        value={state?.address?.country ?? customer.address.country}
      />
    </Form>
  );
}
