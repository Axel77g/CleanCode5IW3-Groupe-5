import {ErrorCallout} from "@/components/ErrorCallout";
import {CustomerDTO} from "@domain/maintenance/entities/Customer";
import CustomerPatchForm from "@/app/customers/[customerId]/CustomerPatchForm";
import {showCustomerUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/customer/showCustomerUseCase";
import {UnregisterCustomerButton} from "@/app/customers/[customerId]/UnregisterCustomerButton";
import List from "@/components/List";
import ListItem from "@/components/ListItem";

export default async function CustomerDetailPage(pageProps: {params: any, searchParams:any}) {
    const {customerId} = await pageProps.params as {customerId: string}
    const result = await showCustomerUseCase({customerId})
    if (!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const customer : CustomerDTO = {
        customerId: result.value.customerId,
        name: result.value.name,
        phoneNumber: result.value.phoneNumber,
        email: result.value.email,
        address: {
            street: result.value.address.street,
            city: result.value.address.city,
            postalCode: result.value.address.postalCode,
            country: result.value.address.country
        },
        vehiculeImmatriculations: result.value.vehiculeImmatriculations.map(vehiculeImmatriculation => vehiculeImmatriculation.getValue()) || []
    }
    return (
        <div>
            <h1 className={"text-xl font-semibold"}>Détails du client {customerId}</h1>
            <CustomerPatchForm
                customer={customer}
            />
            <br/>
            <hr/>
            <br/>
            <div className="flex items-center gap-4">

                <UnregisterCustomerButton customerIdString={customerId}/>


            </div>
            <br/>

            <h2>Véhicules</h2>

            <List>
                {
                    customer.vehiculeImmatriculations.map((vehiculeImmatriculation, index) => {
                        return <ListItem link={`/vehicules/${vehiculeImmatriculation}`} key={index}>{vehiculeImmatriculation}</ListItem>
                    })
                }
            </List>
        </div>
    )
}