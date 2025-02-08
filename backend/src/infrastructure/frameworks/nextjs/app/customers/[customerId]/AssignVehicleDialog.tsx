"use client"
import {Button} from "@/components/Button";
import Select from "@/components/Select";
import {useEffect, useState, useActionState} from "react";
import {Form} from "@/components/Form";
import {Dialog} from "@/components/Dialog";
import HeadingTile from "@/components/HeadingTitle";
import {assignVehicleToCustomer} from "@/app/customers/[customerId]/actions";


const initialState = {
    message : "",
    success : false
}

export function AssignVehicleDialog(props: {isOpen: boolean, customer : any, onClose: () => void}){
    const [state, action] = useActionState(assignVehicleToCustomer, initialState)
    const [vehicles, setVehicles] = useState<{ title: string; value: string }[]>([]);

    useEffect(() => {
       const fetchVehicles = async () => {
           try {
               const response = await fetch("/api/vehicles");
               if (!response.ok) throw new Error("Erreur lors de la récupération des véhicules.");
                const data = await response.json();
               const formattedVehicles = data.map((vehicle: any) => ({
                   title: vehicle.model + " | " + vehicle.immatriculation.value,
                   value: vehicle.immatriculation.value,
               }));
               setVehicles(formattedVehicles)
              } catch (e) {
                    console.error(e)
                }
       };

       fetchVehicles()
    }, [])

    if(!props.customer) return null
    return <Dialog isOpen={props.isOpen} onClose={props.onClose}>
        <HeadingTile>Client | {props.customer.name}</HeadingTile>
        <Form action={action} title={"Assigner un véhicule"} state={state}>
            <input type={"hidden"} name={"customerId"} value={props.customer.customerId}/>
            <Select
                name={"vehicleImmatriculation"}
                label={"Véhicule"}
                options={vehicles}
            />
            <Button>Assigner à la maintenance</Button>
        </Form>
    </Dialog>
}