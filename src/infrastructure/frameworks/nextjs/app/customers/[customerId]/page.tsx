import {ErrorCallout} from "@/components/ErrorCallout";
import {CustomerDTO} from "@domain/maintenance/entities/Customer";
import CustomerPatchForm from "@/app/customers/[customerId]/CustomerPatchForm";
import {showCustomerUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/customer/showCustomerUseCase";
import {UnregisterCustomerButton} from "@/app/customers/[customerId]/UnregisterCustomerButton";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import {Form} from "@/components/Form";

export default async function CustomerDetailPage(pageProps: { params: any, searchParams: any }) {
    const {customerId} = await pageProps.params as { customerId: string }
    const result = await showCustomerUseCase({customerId})
    if (!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const customer: CustomerDTO = {
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
        vehicleImmatriculations: result.value.vehicleImmatriculations.map(vehicleImmatriculation => vehicleImmatriculation.getValue()) || []
    }
    return (
        <div>
            <h1 className={"text-xl font-semibold"}>Détails du client {customerId}</h1>
            <CustomerPatchForm
                customer={customer}
            />

            <Form title={"Liste des véhicules du client"}>
                <List>
                    {
                        customer.vehicleImmatriculations.map((vehicleImmatriculation, index) => {
                            return <ListItem link={`/vehicles/${vehicleImmatriculation}`}
                                             key={index}>
                                #{vehicleImmatriculation}
                            </ListItem>
                        })
                    }
                </List>
            </Form>
            <br/>
            <hr/>
            <br/>
            <div className="flex items-center gap-4">
                <UnregisterCustomerButton customerIdString={customerId}/>
            </div>
            <br/>
        </div>
    )
}