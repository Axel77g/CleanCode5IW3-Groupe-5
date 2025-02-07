"use client";

import { VehiculeModelEnum } from "@domain/maintenance/enums/VehiculeModelEnum";
import { VehiculeStatusEnum } from "@domain/maintenance/enums/VehiculeStatusEnum";
import { useActionState } from "react";
import Input from "@/components/Input";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import Select from "@/components/Select";
import { registerVehiculeAction } from "@/app/vehicules/actions";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";

interface VehiculeRegisterFormProps {
    immatriculation?: VehiculeImmatriculation;
    brand?: string;
    model?: VehiculeModelEnum;
    year?: string;
    vin?: string;
    mileage?: string;
    maintenanceInterval?: {
        mileage?: string;
        duration?: string;
        lastMaintenance?: {
            date?: string;
            mileage?: string;
        };
    };
    status?: VehiculeStatusEnum;
    warranty?: {
        periodStart?: string;
        periodEnd?: string;
    };
}

interface ActionState extends VehiculeRegisterFormProps {
    message: string;
    success: boolean;
}

const initialState = {
    message: "",
    success: false,
};

const modelTypes = [
    { title: "Bonneville T100", value: VehiculeModelEnum.BONNEVILLE_T100 },
    { title: "Bonneville T120", value: VehiculeModelEnum.BONNEVILLE_T120 },
    { title: "Bonneville Bobber", value: VehiculeModelEnum.BONNEVILLE_BOBBER },
    { title: "Bonneville Speedmaster", value: VehiculeModelEnum.BONNEVILLE_SPEEDMASTER },
    { title: "Street Twin", value: VehiculeModelEnum.STREET_TWIN },
    { title: "Street Triple", value: VehiculeModelEnum.STREET_TRIPLE },
    { title: "Street Triple RS", value: VehiculeModelEnum.STREET_TRIPLE_RS },
    { title: "Street Triple R", value: VehiculeModelEnum.STREET_TRIPLE_R },
    { title: "Speed Triple 1200", value: VehiculeModelEnum.SPEED_TRIPLE_1200 },
    { title: "Tiger 900", value: VehiculeModelEnum.TIGER_900 },
    { title: "Tiger Sport 660", value: VehiculeModelEnum.TIGER_SPORT_660 },
    { title: "Tiger Sport 800", value: VehiculeModelEnum.TIGER_SPORT_800 },
    { title: "Tiger 1200", value: VehiculeModelEnum.TIGER_1200 },
    { title: "Rocket 3 R", value: VehiculeModelEnum.ROCKET_3_R },
    { title: "Rocket 3 GT", value: VehiculeModelEnum.ROCKET_3_GT },
    { title: "Scrambler 400 X", value: VehiculeModelEnum.SCRAMBLER_400_X },
    { title: "Scrambler 900", value: VehiculeModelEnum.SCRAMBLER_900 },
    { title: "Thruxton 900", value: VehiculeModelEnum.THRUXTON_900 },
    { title: "Thruxton RS", value: VehiculeModelEnum.THRUXTON_RS },
    { title: "Speed Twin 900", value: VehiculeModelEnum.SPEED_TWIN_900 },
    { title: "Speed Twin 1200", value: VehiculeModelEnum.SPEED_TWIN_1200 },
    { title: "Speed Twin 1200 RS", value: VehiculeModelEnum.SPEED_TWIN_1200_RS },
    { title: "Trident 660", value: VehiculeModelEnum.TRIDENT_660 },
    { title: "TF 450 RC", value: VehiculeModelEnum.TF_450_RC },
];

const status = [
    { title: "Disponible", value: VehiculeStatusEnum.AVAILABLE },
    { title: "Vendu", value: VehiculeStatusEnum.SOLD },
    { title: "En préparation", value: VehiculeStatusEnum.IN_PREPARATION },
    { title: "En maintenances", value: VehiculeStatusEnum.IN_MAINTENANCE },
    { title: "En essai", value: VehiculeStatusEnum.IN_TEST_DRIVE },
    { title: "Réservé", value: VehiculeStatusEnum.RESERVED },
    { title: "Hors service", value: VehiculeStatusEnum.OUT_OF_SERVICE },
];

export default function VehiculeRegisterForm() {
    const [state, formAction] = useActionState<ActionState, FormData>(registerVehiculeAction, initialState);

    return (
        <Form state={state} action={formAction} title={"Ajouter un véhicule"}>
            <div className="grid grid-cols-3 gap-6">
                <div>
                    <label className="block font-semibold text-lg text-gray-700 pb-3">Informations du véhicule</label>
                    <Select name={"status"} options={status} value={state?.status} label={"Statut du véhicule"} />
                    <Select name={"model"} options={modelTypes} value={state?.model} label={"Modèle du véhicule"} />
                    <Input type="text" name="brand" value={"Triumph"} label={"Marque"} placeholder={"Marque du véhicule"} disabled />
                    <Input type="text" name="immatriculation" value={state?.immatriculation?.getValue()} label={"Immatriculation"} placeholder={"AA-123-AA"} />
                    <Input type="number" name="year" value={state?.year} label={"Année"} placeholder={"Année du véhicule"} />
                    <Input type="text" name="vin" value={state?.vin} label={"VIN"} placeholder={"Numéro VIN"} />
                    <Input type="number" name="mileage" value={state?.mileage} label={"Kilométrage"} placeholder={"Kilométrage"} />
                </div>

                <div className="border-l border-gray-300 pl-4">
                    <label className="block font-semibold text-lg text-gray-700 pb-3">Maintenance</label>
                    <Input type="number" name="maintenanceInterval.mileage" value={state?.maintenanceInterval?.mileage} label={"Intervalle de maintenances (km)"} placeholder={"Ex: 10 000 km"} />
                    <Input type="number" name="maintenanceInterval.duration" value={state?.maintenanceInterval?.duration} label={"Intervalle de maintenances (mois)"} placeholder={"Ex: 12 mois"} />
                    <Input type="date" name="maintenanceInterval.lastMaintenance.date" value={state?.maintenanceInterval?.lastMaintenance?.date} label={"Date de la dernière maintenances"}  placeholder={"01/01/2025"}/>
                    <Input type="number" name="maintenanceInterval.lastMaintenance.mileage" value={state?.maintenanceInterval?.lastMaintenance?.mileage} label={"Kilométrage de la dernière maintenances"} placeholder={"9000"} />
                </div>

                <div className="border-l border-gray-300 pl-4">
                    <label className="block font-semibold text-lg text-gray-700 pb-3">Garantie</label>
                    <Input type="date" name="warranty.startDate" value={state?.warranty?.periodStart} label={"Début de la garantie"} placeholder={"01/01/2025"}/>
                    <Input type="date" name="warranty.endDate" value={state?.warranty?.periodEnd}label={"Fin de la garantie"} placeholder={"01/01/2027"} />
                </div>
            </div>

            <Button>Ajouter un véhicule</Button>
        </Form>
    );
}
