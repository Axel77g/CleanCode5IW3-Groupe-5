import {ErrorCallout} from "@/components/ErrorCallout";
import {CustomerDTO} from "@domain/maintenance/entities/Customer";
import {Button} from "@/components/Button";
import Link from "next/link";
import CustomerPatchForm from "@/app/customers/[customerId]/CustomerPatchForm";
import {showCustomerUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/customer/showCustomerUseCase";

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
        vehiculeImmatriculations: [],
    }
    const customerPath = `/customers/${customerId}`
    return (
        <div>
            <h1 className={"text-xl font-semibold"}>Détails du client {customerId}</h1>
            <CustomerPatchForm
                customer={customer}
            />
            <br/>
            <hr/>
            <br/>
            <div className="flex gap-4">
                <Link href={`${customerPath}/vehicles`}>
                    <Button>
                        Accéder aux véhicules
                    </Button>
                </Link>
            </div>
        </div>
    )
}