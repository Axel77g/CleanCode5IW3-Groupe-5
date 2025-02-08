"use client"

import React, { useEffect, useState } from "react";
import { MaintenanceStatusEnum } from "@domain/maintenance/enums/MaintenanceStatusEnum";
import { Form } from "@/components/Form";
import { useActionState } from "react";
import Input from "@/components/Input";
import { Button } from "@/components/Button";
import Select from "@/components/Select";
import {registerMaintenanceAction, updateMaintenanceAction} from "@/app/maintenances/actions";
import ReferenceSelector from "@/components/ReferenceSelector";

interface MaintenanceSparePartProps {
    unitPrice: string,
    quantity: string,
    sparePartReference: string,
}


interface MaintenanceRegisterFormProps {
    maintenanceId?: string,
    siret?: string,
    vehiculeImmatriculation?: string,
    recommendation?: string,
    status?: MaintenanceStatusEnum,
    date?: Date,
    maintenanceSpareParts ?: MaintenanceSparePartProps[]
}

interface ActionState extends MaintenanceRegisterFormProps {
    message: string,
    success: boolean
}

let initialState: ActionState = {
    message: "",
    success: false,
    siret: "",
    vehiculeImmatriculation: "",
    recommendation: "",
    status: MaintenanceStatusEnum.WAITING,
    date: new Date(),
    maintenanceSpareParts: []
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

export default function MaintenanceForm(props: {maintenance ?: MaintenanceRegisterFormProps}) {
    const edit =    props.maintenance !== undefined;
    initialState = {...initialState, ...props.maintenance};
    const [state, formAction] = useActionState<ActionState, FormData>(edit ? updateMaintenanceAction : registerMaintenanceAction, initialState);
    const [garages, setGarages] = useState<{ title: string; value: string }[]>([]);
    const [vehicules, setVehicules] = useState<{ title: string; value: string }[]>([]);
    const [maintenanceSpareParts, setMaintenanceSpareParts] = useState<MaintenanceSparePartProps[]>(state.maintenanceSpareParts || []);

    useEffect(() => {
        const fetchGarages = async () => {
            try {
                const response = await fetch("/api/garages");
                if (!response.ok) throw new Error("Erreur lors de la récupération des garages.");
                const data = await response.json();
                const formattedGarages = data.map((garage: any) => ({
                    title: garage.name || "Garage sans nom",
                    value: garage.siret.value,
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
                const formattedVehicules = data.map((vehicule: any) => ({
                    title: `${vehicule.model || "Véhicule sans modèle"}`,
                    value: vehicule.immatriculation.value,
                }));
                setVehicules(formattedVehicules);
            } catch (error) {
                console.error("Erreur lors du chargement des véhicules :", error);
            }
        };

        fetchGarages();
        fetchVehicules();
    }, []);


    function handleRemoveMaintenanceSparePart(index: number) {
        const temp = [...maintenanceSpareParts];
        temp.splice(index, 1);
        setMaintenanceSpareParts(temp);
    }

    function handleAddMaintenanceSparePart(event: any) {
        event.preventDefault();
        const temp = [...maintenanceSpareParts];
        temp.push({
            unitPrice: "0",
            quantity: "1",
            sparePartReference: "",
        });
        setMaintenanceSpareParts(temp);

    }

    function handleChangeMaintenanceSparePart(index: number, maintenanceSparePart: MaintenanceSparePartProps) {
        const temp = [...maintenanceSpareParts];
        temp[index] = maintenanceSparePart;
        setMaintenanceSpareParts(temp);
    }
    return (
        <Form action={formAction} title={edit ? 'Mettre a jour la maintenance' : "Ajouter une maintenance"} state={state}>
            <input type="hidden" name="maintenanceId" value={state.maintenanceId} />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-6">
                    <Select
                        name="siret"
                        label="Garage"
                        options={garages}
                        value={state.siret}
                    />
                    {state.siret}
                </div>

                <div className="col-span-6">
                    <Select
                        name="vehiculeImmatriculation"
                        label="Véhicule"
                        options={vehicules}
                        value={state.vehiculeImmatriculation}
                        disabled={edit}

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
                        value={state.status}
                    />
                </div>

                <div className="col-span-6">
                    <Input
                        type="date"
                        name="date"
                        value={state.date ? new Date(state.date).toISOString().split("T")[0] : ""}
                        label={"Date de la maintenance"}
                        placeholder={"Date de la maintenance"}
                        disabled={edit}
                    />
                </div>

                <div className="col-span-12">

                    { maintenanceSpareParts.map((maintenanceSparePart, index) => (
                            <MaintenanceSparePartLine
                                index={index} key={maintenanceSparePart.sparePartReference + index}
                                maintenanceSparePart={maintenanceSparePart}
                                onChange={(maintenanceSparePart) => handleChangeMaintenanceSparePart(index, maintenanceSparePart)}
                                onDelete={() => handleRemoveMaintenanceSparePart(index)}
                            />
                        ))
                    }
                    <Button  onClick={handleAddMaintenanceSparePart}>Ajouter une piece</Button>
                </div>

                <div className="col-span-12">
                    <Button>
                        {edit ? "Mettre a jour la maintenance" : "Ajouter une maintenance"}
                    </Button>
                </div>
            </div>
        </Form>
    );
}


function MaintenanceSparePartLine(props: {index: number,maintenanceSparePart : MaintenanceSparePartProps , onChange : (line : any) => void, onDelete ?: (...args : [any]) => void}){

    function handleChange(e : React.ChangeEvent<HTMLInputElement>){
        props.onChange({
            ...props.maintenanceSparePart,
            [e.target.name]: e.target.value
        })
    }

    return <div className={"border-solid border-[1px] border-slate-300 rounded p-4 my-2"}>
        <ReferenceSelector  label={"Pièce détachée"} reference={props.maintenanceSparePart.sparePartReference}  onChange={(sparePartReference) => props.onChange({...props.maintenanceSparePart, sparePartReference})}/>
        <input name={`maintenanceSpareParts[${props.index}].sparePartReference`} type={"hidden"} value={props.maintenanceSparePart.sparePartReference} onChange={handleChange} />
        <Input placeholder={"Quantité"} label={"Quantité"} name={`maintenanceSpareParts[${props.index}].quantity`} type={"number"} value={props.maintenanceSparePart.quantity} onChange={handleChange} />
        <Input placeholder={"Prix unitaire"} label={"Prix unitaire"} name={`maintenanceSpareParts[${props.index}].unitPrice`} type={"number"} value={props.maintenanceSparePart.unitPrice} onChange={handleChange} />
        <Button onClick={props.onDelete}>Retirer</Button>
    </div>
}
