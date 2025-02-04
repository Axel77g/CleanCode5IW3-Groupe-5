"use client";

import {VehiculeModelEnum} from "@domain/maintenance/enums/VehiculeModelEnum";
import {VehiculeStatusEnum} from "@domain/maintenance/enums/VehiculeStatusEnum";
import {useActionState} from "react";
import Input from "@/components/Input";
import {Button} from "@/components/Button";
import {Form} from "@/components/Form";
import Select from "@/components/Select";
import {registerVehiculeAction} from "@/app/vehicules/actions";

interface VehiculeRegisterFormProps {
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
    };
    status?: VehiculeStatusEnum;
    warranty?: {
        periodStart?: string,
        periodEnd?: string,
    }
}

interface ActionState extends VehiculeRegisterFormProps {
    message: string,
    success: boolean
}

const initialState = {
    message: "",
    success: false
}

const modelTypes = [
    {title: "Bonneville T100",value: VehiculeModelEnum.BONNEVILLE_T100},
    {title: "Bonneville T120", value: VehiculeModelEnum.BONNEVILLE_T120},
    {title: "Bonneville Bobber", value: VehiculeModelEnum.BONNEVILLE_BOBBER},
    {title: "Bonneville Speedmaster", value: VehiculeModelEnum.BONNEVILLE_SPEEDMASTER},
    {title: "Street Twin", value: VehiculeModelEnum.STREET_TWIN},
    {title: "Street Triple", value: VehiculeModelEnum.STREET_TRIPLE},
    {title: "Street Triple RS", value: VehiculeModelEnum.STREET_TRIPLE_RS},
    {title: "Street Triple R", value: VehiculeModelEnum.STREET_TRIPLE_R},
    {title: "Speed Triple 1200", value: VehiculeModelEnum.SPEED_TRIPLE_1200},
    {title: "Tiger 900", value: VehiculeModelEnum.TIGER_900},
    {title: "Tiger Sport 660", value: VehiculeModelEnum.TIGER_SPORT_660},
    {title: "Tiger Sport 800", value: VehiculeModelEnum.TIGER_SPORT_800},
    {title: "Tiger 1200", value: VehiculeModelEnum.TIGER_1200},
    {title: "Rocket 3 R", value: VehiculeModelEnum.ROCKET_3_R},
    {title: "Rocket 3 GT", value: VehiculeModelEnum.ROCKET_3_GT},
    {title: "Scrambler 400 X", value: VehiculeModelEnum.SCRAMBLER_400_X},
    {title: "Scrambler 900", value: VehiculeModelEnum.SCRAMBLER_900},
    {title: "Thruxton 900", value: VehiculeModelEnum.THRUXTON_900},
    {title: "Thruxton RS", value: VehiculeModelEnum.THRUXTON_RS},
    {title: "Speed Twin 900", value: VehiculeModelEnum.SPEED_TWIN_900},
    {title: "Speed Twin 1200", value: VehiculeModelEnum.SPEED_TWIN_1200},
    {title: "Speed Twin 1200 RS", value: VehiculeModelEnum.SPEED_TWIN_1200_RS},
    {title: "Trident 660", value: VehiculeModelEnum.TRIDENT_660},
    {title: "TF 450 RC", value: VehiculeModelEnum.TF_450_RC}
];

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

export default function VehiculeRegisterForm() {
    const [state, formAction] = useActionState<ActionState, FormData>(registerVehiculeAction, initialState);
    return (
        <Form state={state} action={formAction} title={"Ajouter un véhicule"}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{width: '50%'}}>
                    <label className="block font-semibold text-lg text-gray-700 pb-3">Informations du véhicule</label>
                    <div className="w-fit">
                        <Select name={"status"} options={status} value={state?.status} label={"Statut du véhicule"}/>
                        <Select name={"model"} options={modelTypes} value={state?.model} label={"Modèle du véhicule"}/>
                    </div>
                    <Input type="text" name="brand" value={"Triumph"} label={"Marque"}
                           placeholder={"Marque du véhicule"} disabled/>
                    <Input type="text" name="immatriculation" value={state?.immatriculation} label={"Immatriculation"} placeholder={"AA-123-AA"}/>
                    <Input type="number" name="year" value={state?.year} label={"Année"} placeholder={"Année du véhicule"}/>
                    <Input type="text" name="vin" value={state?.vin} label={"Vin"} placeholder={"Vin du véhicule"}/>
                    <Input type="number" name="mileage" value={state?.mileage} label={"Kilométrage"} placeholder={"Kilométrage du véhicule"}/>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                    <label className="block font-semibold text-lg text-gray-700 pb-3">Maintenance</label>
                    <Input type="number" name="maintenanceInterval.mileage" value={state?.maintenanceInterval?.mileage} label={"Intervalle de maintenance (km)"}
                           placeholder={"Intervalle de maintenance"}/>
                    <Input type="number" name="maintenanceInterval.duration"
                           value={state?.maintenanceInterval?.duration}
                           label={"Intervalle de maintenance (mois)"}
                           placeholder={"Intervalle de maintenance"}/>
                    <Input type="date" name="maintenanceInterval.lastMaintenance.date"
                           value={state?.maintenanceInterval?.lastMaintenance?.date}
                           label={"Dernière maintenance"}
                           placeholder={"Dernière maintenance"}/>
                    <Input type="number" name="maintenanceInterval.lastMaintenance.mileage"
                           value={state?.maintenanceInterval?.lastMaintenance?.mileage}
                           label={"Kilométrage de la dernière maintenance"}
                           placeholder={"Kilométrage de la dernière maintenance"}/>
                </div>
                <div>
                    <label className="block font-semibold text-lg text-gray-700 pb-3">Garantie</label>
                    <Input type="date" name="warranty.startDate"
                           value={state?.warranty?.periodStart}
                           label={"Début de la garantie"}
                           placeholder={"Début de la garantie"}/>
                    <Input type="date" name="warranty.endDate"
                           value={state?.warranty?.periodEnd}
                           label={"Fin de la garantie"}
                           placeholder={"Fin de la garantie"}/>
                </div>
            </div>
            <Button>Ajouter un véhicule</Button>
        </Form>
    );
}
