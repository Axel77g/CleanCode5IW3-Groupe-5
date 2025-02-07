"use client"

import React, { useEffect, useState } from "react";
import { MaintenanceStatusEnum } from "@domain/maintenance/enums/MaintenanceStatusEnum";
import { Form } from "@/components/Form";
import { useActionState } from "react";
import Input from "@/components/Input";
import { Button } from "@/components/Button";
import Select from "@/components/Select";
import { registerMaintenanceAction } from "@/app/maintenances/actions";

interface MaintenanceRegisterFormProps {
    maintenanceId?: string,
    garageSiret?: string,
    vehiculeImmatriculation?: string,
    recommendation?: string,
    status?: MaintenanceStatusEnum,
    date?: Date,
    maintenanceSpareParts?: {
        unitPrice?: number,
        quantity?: number,
        sparePartReference?: string,
    }
}

interface ActionState extends MaintenanceRegisterFormProps {
    message: string,
    success: boolean
}

const initialState: ActionState = {
    message: "",
    success: false,
    garageSiret: "",
    vehiculeImmatriculation: "",
    recommendation: "",
    status: MaintenanceStatusEnum.WAITING,
    date: new Date(),
    maintenanceSpareParts: {
        unitPrice: 0,
        quantity: 0,
        sparePartReference: "",
    }
};

const statusOptions = [
    {
        title: "En attente",
        value: MaintenanceStatusEnum.WAITING
    },
    {
        title: "En cours",
        value: MaintenanceStatusEnum.IN_PROGRESS
    },
    {
        title: "Terminée",
        value: MaintenanceStatusEnum.FINISHED
    },
];

export default function MaintenanceRegisterForm() {
    const [state, formAction] = useActionState<ActionState, FormData>(registerMaintenanceAction, initialState);
    const [garages, setGarages] = useState<{ title: string; value: string }[]>([]);
    const [vehicules, setVehicules] = useState<{ title: string; value: string }[]>([]);

    useEffect(() => {
        const fetchGarages = async () => {
            try {
                const response = await fetch("/api/garages");
                if (!response.ok) throw new Error("Erreur lors de la récupération des garages.");
                const data = await response.json();
                const formattedGarages = data.map((garage: any) => ({
                    title: garage.name || "Garage sans nom",
                    value: garage.siret,
                }));
                setGarages(formattedGarages);
            } catch (error) {
                console.error("Erreur lors du chargement des garages :", error);
            }
        };

        const fetchVehicules = async () => {
            try {
                const response = await fetch("/api/vehicules");
                if (!response.ok) throw new Error("Erreur lors de la récupération des véhicules.");
                const data = await response.json();
                console.log(data);
                const formattedVehicules = data.map((vehicule: any) => ({
                    title: `${vehicule.model || "Véhicule sans modèle"}`,
                    value: vehicule.immatriculation,
                }));
                setVehicules(formattedVehicules);
            } catch (error) {
                console.error("Erreur lors du chargement des véhicules :", error);
            }
        };

        fetchGarages();
        fetchVehicules();
    }, []);

    return (
        <Form action={formAction} title={"Ajouter une maintenance"} state={state}>
            <input type="hidden" name="maintenanceId" value={state.maintenanceId} />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-6">
                    <Select
                        name="garageSiret"
                        label="Garage"
                        options={garages}
                    />
                </div>

                <div className="col-span-6">
                    <Select
                        name="vehiculeImmatriculation"
                        label="Véhicule"
                        options={vehicules}
                    />
                </div>

                <div className="col-span-12">
                    <Input
                        type="textarea"
                        name="recommendation"
                        value={state.recommendation}
                        label={"Recommandation"}
                        placeholder={"Recommandation"}
                    />
                </div>

                <div className="col-span-6">
                    <Select
                        name="status"
                        label="Statut"
                        options={statusOptions}
                    />
                </div>

                <div className="col-span-6">
                    <Input
                        type="date"
                        name="date"
                        value={state.date ? new Date(state.date).toISOString().split("T")[0] : ""}
                        label={"Date de la maintenance"}
                        placeholder={"Date de la maintenance"}
                    />
                </div>

                <div className="col-span-12">

                </div>

                <div className="col-span-12">
                    <Button>Ajouter une maintenance</Button>
                </div>
            </div>
        </Form>
    );
}


