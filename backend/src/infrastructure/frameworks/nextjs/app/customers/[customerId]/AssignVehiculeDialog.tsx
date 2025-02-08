"use client"
import {Button} from "@/components/Button";
import Select from "@/components/Select";
import {useEffect, useState, useActionState} from "react";
import {Form} from "@/components/Form";
import {Dialog} from "@/components/Dialog";
import HeadingTile from "@/components/HeadingTitle";
import {assignVehiculeToCustomer} from "@/app/customers/[customerId]/actions";


const initialState = {
    message : "",
    success : false
}

export function AssignVehiculeDialog(props: {isOpen: boolean, customer : any, onClose: () => void}){
    const [state, action] = useActionState(assignVehiculeToCustomer, initialState)
    const [vehicules, setVehicules] = useState<{ title: string; value: string }[]>([]);

    useEffect(() => {
       const fetchVehicules = async () => {
           try {
               const response = await fetch("/api/vehicules");
               if (!response.ok) throw new Error("Erreur lors de la récupération des véhicules.");
                const data = await response.json();
               const formattedVehicules = data.map((vehicule: any) => ({
                   title: vehicule.model + " | " + vehicule.immatriculation.value,
                   value: vehicule.immatriculation.value,
               }));
               setVehicules(formattedVehicules)
              } catch (e) {
                    console.error(e)
                }
       };

       fetchVehicules()
    }, [])

    if(!props.customer) return null
    return <Dialog isOpen={props.isOpen} onClose={props.onClose}>
        <HeadingTile>Client | {props.customer.name}</HeadingTile>
        <Form action={action} title={"Assigner un véhicule"} state={state}>
            <input type={"hidden"} name={"customerId"} value={props.customer.customerId}/>
            <Select
                name={"vehiculeImmatriculation"}
                label={"Véhicule"}
                options={vehicules}
            />
            <Button>Assigner à la maintenance</Button>
        </Form>
    </Dialog>
}