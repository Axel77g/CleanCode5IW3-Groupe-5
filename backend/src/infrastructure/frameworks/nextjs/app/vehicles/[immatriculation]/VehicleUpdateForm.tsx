"use client"

import {} from '@/app/vehicles/actions';
import {useActionState} from "react";
import {Form} from "@/components/Form";
import Input from "@/components/Input";
import {Button} from "@/components/Button";
import {updateVehicleAction} from "@/app/vehicles/[immatriculation]/actions";
import {VehicleStatusEnum} from "@domain/maintenance/enums/VehicleStatusEnum";
import Select from "@/components/Select";
import {VehicleModelEnum} from "@domain/maintenance/enums/VehicleModelEnum";
import Link from "next/link";

interface VehicleUpdateFormProps {
    immatriculation?: string;
    brand?: "Triumph",
    model?: VehicleModelEnum;
    year?: string;
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
    status?: VehicleStatusEnum;
    warranty?: {
        periodStart?: Date,
        periodEnd?: Date,
    }
}

interface ActionState extends VehicleUpdateFormProps {
    message: string,
    success: boolean
}

const initialState = {
    message: "",
    success: false
}

const status = [
    {title: "Disponible", value: VehicleStatusEnum.AVAILABLE},
    {title: "Vendu", value: VehicleStatusEnum.SOLD},
    {title: "En préparation", value: VehicleStatusEnum.IN_PREPARATION},
    {title: "En maintenances", value: VehicleStatusEnum.IN_MAINTENANCE},
    {title: "En essai", value: VehicleStatusEnum.IN_TEST_DRIVE},
    {title: "Réservé", value: VehicleStatusEnum.RESERVED},
    {title: "Hors service", value: VehicleStatusEnum.OUT_OF_SERVICE},
];

export default function VehicleUpdateForm({vehicle}: { vehicle: VehicleUpdateFormProps }) {
    const [state, formAction] = useActionState<ActionState, FormData>(updateVehicleAction, initialState);
    const vehiclePath = `/vehicles/${vehicle.immatriculation}`;
    return (
        <Form state={state} action={formAction} title={"Modifier un véhicule"}>
            <input type={"hidden"} name={"immatriculation"} value={vehicle.immatriculation}/>
            <div className="grid grid-cols-3 gap-6">
                <div>
                    <label className="block font-semibold text-lg text-gray-700 pb-3">Informations du véhicule</label>
                    <Input type="text" name={"model"} value={vehicle?.model} label={"Modèle du véhicule"}
                           placeholder={"Modèle du véhicule"} disabled/>
                    <Input type="text" name="brand" value={"Triumph"} label={"Marque"}
                           placeholder={"Marque du véhicule"} disabled/>
                    <Input type="text" name="immatriculation" value={vehicle?.immatriculation}
                           label={"Immatriculation"} placeholder={"AA-123-AA"} disabled/>
                    <Input type="text" name="year" value={vehicle?.year} label={"Année"}
                           placeholder={"Année du véhicule"} disabled/>
                    <Input type="text" name="vin" value={vehicle?.vin} label="Vin" placeholder="Vin du véhicule"
                           disabled/>
                    <Input type="number" name="mileage" value={state?.mileage ?? vehicle?.mileage}
                           label={"Kilométrage"} placeholder={"Kilométrage du véhicule"}/>
                </div>
                <div>
                    <label className="block font-semibold text-lg text-gray-700 pb-3">Maintenance</label>
                    <Input type="text" name="maintenanceInterval.mileage"
                           value={vehicle?.maintenanceInterval?.mileage ?? ''}
                           label={"Intervalle de maintenances (km)"} placeholder={"Intervalle de maintenances"}
                           disabled={!vehicle?.maintenanceInterval?.mileage}/>
                    <Input type="text" name="maintenanceInterval.duration"
                           value={vehicle?.maintenanceInterval?.duration ?? ''}
                           label={"Intervalle de maintenances (mois)"} placeholder={"Intervalle de maintenances"}
                           disabled={!vehicle?.maintenanceInterval?.duration}/>
                    <Input type="date" name="maintenanceInterval.lastMaintenance.date"
                           value={vehicle?.maintenanceInterval?.lastMaintenance?.date ? vehicle.maintenanceInterval.lastMaintenance.date.toISOString().split('T')[0] : ''}
                           label={"Dernière maintenances"} placeholder={"Dernière maintenances"}/>
                    <Input type="number" name="maintenanceInterval.lastMaintenance.mileage"
                           value={vehicle?.maintenanceInterval?.lastMaintenance?.mileage ?? ''}
                           label={"Kilométrage de la dernière maintenances"}
                           placeholder={"Kilométrage de la dernière maintenances"}/>
                </div>

                <div>
                    <label className="block font-semibold text-lg text-gray-700 pb-3">Garantie</label>
                    <Input type="date" name="warranty.periodStart"
                           value={vehicle?.warranty?.periodStart ? vehicle.warranty.periodStart.toISOString().split('T')[0] : ''}
                           label={"Début de la garantie"} placeholder={"Début de la garantie"} disabled/>
                    <Input type="date" name="warranty.periodEnd"
                           value={vehicle?.warranty?.periodEnd ? vehicle.warranty.periodEnd.toISOString().split('T')[0] : ''}
                           label={"Fin de la garantie"} placeholder={"Fin de la garantie"} disabled/>
                    <Select name="status" label={"Statut"} options={status} value={vehicle?.status}/>
                </div>
            </div>


            <div className={"flex items-center gap-4"}>
                <Button variant={"submit"}>Modifier le véhicule</Button>


                <Link href={`${vehiclePath}/breakdowns`}>
                    <Button>
                        Accéder aux pannes
                    </Button>
                </Link>

                <Link href={`${vehiclePath}/maintenances`}>
                    <Button>
                        Accéder aux maintenances
                    </Button>
                </Link>
            </div>
        </Form>
    );
}
