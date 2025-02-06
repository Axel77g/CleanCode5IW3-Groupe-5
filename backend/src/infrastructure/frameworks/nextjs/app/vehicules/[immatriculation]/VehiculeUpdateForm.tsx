"use client"

import {} from '@/app/vehicules/actions';
import {useActionState} from "react";
import {Form} from "@/components/Form";
import Input from "@/components/Input";
import {Button} from "@/components/Button";
import {updateVehiculeAction} from "@/app/vehicules/[immatriculation]/actions";
import {VehiculeStatusEnum} from "@domain/maintenance/enums/VehiculeStatusEnum";
import Select from "@/components/Select";
import {VehiculeModelEnum} from "@domain/maintenance/enums/VehiculeModelEnum";

interface VehiculeUpdateFormProps {
    immatriculation?: string;
    brand?: "Triumph",
    model?: VehiculeModelEnum;
    year?: number;
    vin?: string;
    mileage?: string,
    maintenanceInterval?: {
        mileage?: string,
        duration?: string,
        lastMaintenance?: {
            date?: Date | undefined,
            mileage?: string | undefined,
        }
    },
    status?: VehiculeStatusEnum;
    warranty?: {
        periodStart?: Date,œ
        periodEnd?: Date,
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
    { title: "Disponible", value: VehiculeStatusEnum.AVAILABLE },
    { title: "Vendu", value: VehiculeStatusEnum.SOLD },
    { title: "En préparation", value: VehiculeStatusEnum.IN_PREPARATION },
    { title: "En maintenance", value: VehiculeStatusEnum.IN_MAINTENANCE },
    { title: "En essai", value: VehiculeStatusEnum.IN_TEST_DRIVE },
    { title: "Réservé", value: VehiculeStatusEnum.RESERVED },
    { title: "Hors service", value: VehiculeStatusEnum.OUT_OF_SERVICE },
];

export default function VehiculeUpdateForm({vehicule}: { vehicule: VehiculeUpdateFormProps }) {
    const [state, formAction] = useActionState<ActionState, FormData>(updateVehiculeAction, initialState);

    return (
        <Form state={state} action={formAction} title={"Modifier un véhicule"}>
            <input type={"hidden"} name={"immatriculation"} value={vehicule.immatriculation}/>
            <div className="grid grid-cols-3 gap-6">
                <div>
                    <label className="block font-semibold text-lg text-gray-700 pb-3">Informations du véhicule</label>
                    <Input type="text" name={"model"} value={vehicule?.model} label={"Modèle du véhicule"} placeholder={"Modèle du véhicule"} disabled />
                    <Input type="text" name="brand" value={"Triumph"} label={"Marque"} placeholder={"Marque du véhicule"} disabled />
                    <Input type="text" name="immatriculation" value={vehicule?.immatriculation} label={"Immatriculation"} placeholder={"AA-123-AA"} disabled />
                    <Input type="text" name="year" value={vehicule?.year} label={"Année"} placeholder={"Année du véhicule"} disabled />
                    <Input type="text" name="vin" value={vehicule?.vin} label="Vin" placeholder="Vin du véhicule" disabled />
                    <Input type="number" name="mileage" value={state?.mileage ?? vehicule?.mileage} label={"Kilométrage"} placeholder={"Kilométrage du véhicule"} />
                </div>

                <div>
                    <label className="block font-semibold text-lg text-gray-700 pb-3">Maintenance</label>
                    <Input type="text" name="maintenanceInterval.mileage" value={vehicule?.maintenanceInterval?.mileage ?? ''} label={"Intervalle de maintenance (km)"} placeholder={"Intervalle de maintenance"} disabled={!vehicule?.maintenanceInterval?.mileage} />
                    <Input type="text" name="maintenanceInterval.duration" value={vehicule?.maintenanceInterval?.duration ?? ''} label={"Intervalle de maintenance (mois)"} placeholder={"Intervalle de maintenance"} disabled={!vehicule?.maintenanceInterval?.duration} />
                    <Input type="date" name="maintenanceInterval.lastMaintenance.date" value={vehicule?.maintenanceInterval?.lastMaintenance?.date ? vehicule.maintenanceInterval.lastMaintenance.date.toISOString().split('T')[0] : ''} label={"Dernière maintenance"} placeholder={"Dernière maintenance"} />
                    <Input type="number" name="maintenanceInterval.lastMaintenance.mileage" value={vehicule?.maintenanceInterval?.lastMaintenance?.mileage ?? ''} label={"Kilométrage de la dernière maintenance"} placeholder={"Kilométrage de la dernière maintenance"} />
                </div>

                <div>
                    <label className="block font-semibold text-lg text-gray-700 pb-3">Garantie</label>
                    <Input type="date" name="warranty.periodStart" value={vehicule?.warranty?.periodStart ? vehicule.warranty.periodStart.toISOString().split('T')[0] : ''} label={"Début de la garantie"} placeholder={"Début de la garantie"} disabled />
                    <Input type="date" name="warranty.periodEnd" value={vehicule?.warranty?.periodEnd ? vehicule.warranty.periodEnd.toISOString().split('T')[0] : ''} label={"Fin de la garantie"} placeholder={"Fin de la garantie"} disabled />
                    <Select name="status" label={"Statut"} options={status} value={vehicule?.status} />
                </div>
            </div>
            <Button>Modifier le véhicule</Button>
        </Form>
    );
}
