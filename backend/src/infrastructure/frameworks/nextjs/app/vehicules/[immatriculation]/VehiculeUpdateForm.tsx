"use client"
import {} from '@/app/vehicules/actions';
import { useActionState } from "react";
import { Form } from "@/components/Form";
import Input from "@/components/Input";
import { Button } from "@/components/Button";
import { updateVehiculeAction } from "@/app/vehicules/[immatriculation]/actions";
import { VehiculeStatusEnum } from "@domain/maintenance/enums/VehiculeStatusEnum";
import Select from "@/components/Select";
import { VehiculeModelEnum } from "@domain/maintenance/enums/VehiculeModelEnum";

interface VehiculeUpdateFormProps {
    immatriculation?: string;
    brand?: string,
    model?: VehiculeModelEnum;
    year?: string;
    vin?: string;
    mileage?: string,
    maintenanceInterval?: {
        mileage?: string,
        duration?: string,
        lastMaintenance?: {
            date?: string,
            mileage?: string,
        }
    },
    status?: VehiculeStatusEnum;
    warranty?: {
        periodStart?: string,
        periodEnd?: string,
    }
}

interface ActionState extends VehiculeUpdateFormProps {
    message: string,
    success: boolean
}

const initialState = {
    message: "",
    success: false
}

const status = [
    {
        title: "Disponible",
        value: VehiculeStatusEnum.AVAILABLE
    },
    {
        title: "Vendu",
        value: VehiculeStatusEnum.SOLD
    },
    {
        title: "En préparation",
        value: VehiculeStatusEnum.IN_PREPARATION
    },
    {
        title: "En maintenance",
        value: VehiculeStatusEnum.IN_MAINTENANCE
    },
    {
        title: "En essai",
        value: VehiculeStatusEnum.IN_TEST_DRIVE
    },
    {
        title: "Réservé",
        value: VehiculeStatusEnum.RESERVED
    },
    {
        title: "Hors service",
        value: VehiculeStatusEnum.OUT_OF_SERVICE,
    },
]

export default function VehiculeUpdateForm({ vehicule }: { vehicule: VehiculeUpdateFormProps }) {
    const [state, formAction] = useActionState<ActionState, FormData>(updateVehiculeAction, initialState);

    return (
        <Form state={state} action={formAction} title={"Modifier un véhicule"}>
            <input type={"hidden"} name={"immatriculation"} value={vehicule.immatriculation} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '50%' }}>
                    <div className="w-fit">
                        <Select name="status" label={"Statut"} options={status} value={vehicule?.status} />
                    </div>
                    <label className="block font-semibold text-lg text-gray-700 pb-3">Informations du véhicule</label>
                    <Input type="text" name={"model"} value={vehicule?.model} label={"Modèle du véhicule"} placeholder={"Modèle du véhicule"} disabled/>
                    <Input type="text" name="brand" value={"Triumph"} label={"Marque"} placeholder={"Marque du véhicule"} disabled />
                    <Input type="text" name="immatriculation" value={vehicule?.immatriculation} label={"Immatriculation"} placeholder={"AA-123-AA"} disabled />
                    <Input type="number" name="year" value={vehicule?.year} label={"Année"} placeholder={"Année du véhicule"} disabled />
                    <Input type="text" name="vin" value={vehicule?.vin} label="Vin" placeholder="Vin du véhicule" disabled />
                    <Input type="number" name="mileage" value={state?.mileage ?? vehicule?.mileage} label={"Kilométrage"} placeholder={"Kilométrage du véhicule"} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                    <label className="block font-semibold text-lg text-gray-700 pb-3">Maintenance</label>
                    <Input type="number" name="maintenanceInterval.mileage"
                           value={vehicule?.maintenanceInterval?.mileage ?? ''} label={"Intervalle de maintenance (km)"}
                           placeholder={"Intervalle de maintenance"} disabled={!vehicule?.maintenanceInterval?.mileage}
                    />
                    <Input type="number" name="maintenanceInterval.duration"
                           value={vehicule?.maintenanceInterval?.duration ?? ''} label={"Intervalle de maintenance (mois)"}
                           placeholder={"Intervalle de maintenance"} disabled={!vehicule?.maintenanceInterval?.duration}
                    />
                    <Input type="date" name="maintenanceInterval.lastMaintenance.date"
                           value={vehicule?.maintenanceInterval?.lastMaintenance?.date ?? ''} label={"Dernière maintenance"}
                           placeholder={"Dernière maintenance"}
                    />
                    <Input type="number" name="maintenanceInterval.lastMaintenance.mileage"
                           value={vehicule?.maintenanceInterval?.lastMaintenance?.mileage ?? ''} label={"Kilométrage de la dernière maintenance"}
                           placeholder={"Kilométrage de la dernière maintenance"}
                    />
                </div>
                <div>
                    <label className="block font-semibold text-lg text-gray-700 pb-3">Garantie</label>
                    <Input type="date" name="warranty.periodStart"
                           value={state?.warranty?.periodStart ?? vehicule?.warranty?.periodStart ?? ''} label={"Début de la garantie"}
                           placeholder={"Début de la garantie"}
                    />
                    <Input type="date" name="warranty.periodEnd"
                           value={state?.warranty?.periodEnd ?? vehicule?.warranty?.periodEnd ?? ''} label={"Fin de la garantie"}
                           placeholder={"Fin de la garantie"}
                    />
                </div>
            </div>
            <Button>Modifier le véhicule</Button>
        </Form>
    );
}
