"use client";

import { Period } from "@domain/testDrive/value-object/Period";
import { ActionState } from "../drivers/[driverLicenseId]/incidents/DriverIncidentsForm";
import { useActionState } from "react";

interface VehiculeRegisterFormProps {
  immatrculation?: string | undefined;
  brand?: string | undefined;
  model?: string | undefined;
  year?: number | undefined;
  vin?: string | undefined;
  mileage?: number | undefined;
  maintenanceDate?: Date | undefined;
  status?: string | undefined;
  warrant: Period;
}

interface ActionSattte extends VehiculeRegisterFormProps {
  message: string;
  success: boolean;
}

const initialState = {
  message: "",
  success: false,
};

export default function VehiculeRegisterForm() {
  const [state, formAction] = useActionState<ActionState, FormData>(
    registerVehicule,
    initialState
  );
}
