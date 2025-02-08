"use client";

import { VehicleModelEnum } from "@domain/maintenance/enums/VehicleModelEnum";
import { VehicleStatusEnum } from "@domain/maintenance/enums/VehicleStatusEnum";
import { useActionState } from "react";
import Input from "@/components/Input";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import Select from "@/components/Select";
import { registerVehicleAction } from "@/app/vehicles/actions";

interface VehicleRegisterFormProps {
    immatriculation?: string;
    brand?: string;
    model?: VehicleModelEnum;
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
    status?: VehicleStatusEnum;
    warranty?: {
        startDate?: string;
        endDate?: string;
    };
}

interface ActionState extends VehicleRegisterFormProps {
    message: string;
    success: boolean;
}

const initialState = {
    message: "",
    success: false,
};

const modelTypes = [
    { title: "Bonneville T100", value: VehicleModelEnum.BONNEVILLE_T100 },
    { title: "Bonneville T120", value: VehicleModelEnum.BONNEVILLE_T120 },
    { title: "Bonneville Bobber", value: VehicleModelEnum.BONNEVILLE_BOBBER },
    { title: "Bonneville Speedmaster", value: VehicleModelEnum.BONNEVILLE_SPEEDMASTER },
    { title: "Street Twin", value: VehicleModelEnum.STREET_TWIN },
    { title: "Street Triple", value: VehicleModelEnum.STREET_TRIPLE },
    { title: "Street Triple RS", value: VehicleModelEnum.STREET_TRIPLE_RS },
    { title: "Street Triple R", value: VehicleModelEnum.STREET_TRIPLE_R },
    { title: "Speed Triple 1200", value: VehicleModelEnum.SPEED_TRIPLE_1200 },
    { title: "Tiger 900", value: VehicleModelEnum.TIGER_900 },
    { title: "Tiger Sport 660", value: VehicleModelEnum.TIGER_SPORT_660 },
    { title: "Tiger Sport 800", value: VehicleModelEnum.TIGER_SPORT_800 },
    { title: "Tiger 1200", value: VehicleModelEnum.TIGER_1200 },
    { title: "Rocket 3 R", value: VehicleModelEnum.ROCKET_3_R },
    { title: "Rocket 3 GT", value: VehicleModelEnum.ROCKET_3_GT },
    { title: "Scrambler 400 X", value: VehicleModelEnum.SCRAMBLER_400_X },
    { title: "Scrambler 900", value: VehicleModelEnum.SCRAMBLER_900 },
    { title: "Thruxton 900", value: VehicleModelEnum.THRUXTON_900 },
    { title: "Thruxton RS", value: VehicleModelEnum.THRUXTON_RS },
    { title: "Speed Twin 900", value: VehicleModelEnum.SPEED_TWIN_900 },
    { title: "Speed Twin 1200", value: VehicleModelEnum.SPEED_TWIN_1200 },
    { title: "Speed Twin 1200 RS", value: VehicleModelEnum.SPEED_TWIN_1200_RS },
    { title: "Trident 660", value: VehicleModelEnum.TRIDENT_660 },
    { title: "TF 450 RC", value: VehicleModelEnum.TF_450_RC },
];

const status = [
    { title: "Disponible", value: VehicleStatusEnum.AVAILABLE },
    { title: "Vendu", value: VehicleStatusEnum.SOLD },
    { title: "En préparation", value: VehicleStatusEnum.IN_PREPARATION },
    { title: "En maintenances", value: VehicleStatusEnum.IN_MAINTENANCE },
    { title: "En essai", value: VehicleStatusEnum.IN_TEST_DRIVE },
    { title: "Réservé", value: VehicleStatusEnum.RESERVED },
    { title: "Hors service", value: VehicleStatusEnum.OUT_OF_SERVICE },
];

export default function VehicleRegisterForm() {
    const [state, formAction] = useActionState<ActionState, FormData>(registerVehicleAction, initialState);

    return (
        <Form state={state} action={formAction} title={"Ajouter un véhicule"}>
            <div className="grid grid-cols-3 gap-6">
                <div>
                    <label className="block font-semibold text-lg text-gray-700 pb-3">Informations du véhicule</label>
                    <Select name={"status"} options={status} value={state?.status} label={"Statut du véhicule"} />
                    <Select name={"model"} options={modelTypes} value={state?.model} label={"Modèle du véhicule"} />
                    <Input type="text" name="brand" value={"Triumph"} label={"Marque"} placeholder={"Marque du véhicule"} disabled />
                    <Input type="text" name="immatriculation" value={state?.immatriculation} label={"Immatriculation"} placeholder={"AA-123-AA"} />
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
                    <Input type="date" name="warranty.startDate" value={state?.warranty?.startDate} label={"Début de la garantie"} placeholder={"01/01/2025"}/>
                    <Input type="date" name="warranty.endDate" value={state?.warranty?.endDate} label={"Fin de la garantie"} placeholder={"01/01/2027"} />
                </div>
            </div>

            <Button>Ajouter un véhicule</Button>
        </Form>
    );
}
