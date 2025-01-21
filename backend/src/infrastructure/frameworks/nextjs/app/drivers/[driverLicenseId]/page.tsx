import {createShowDriverUseCase} from "@application/testDrive/usecases/driver/ShowDriverUseCase";
import {driverRepository} from "@infrastructure/frameworks/core/repositories/testDrive/driverRepository";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import DriverPatchForm from "@/app/drivers/[driverLicenseId]/DriverPatchForm";
import {DriverDTO} from "@domain/testDrive/entities/Driver";
import {useServerPagination} from "@/hooks/useServerPagination";
import DriverIncidentsList from "@/app/drivers/[driverLicenseId]/DriverIncidentsList";
import {Button} from "@/components/Button";
import Link from "next/link";
import {ErrorCallout} from "@/components/ErrorCallout";
export default async function DriverDetailPage(pageProps: {params: any, searchParams:any}) {
    const {driverLicenseId : driverLicenseIdString} = await pageProps.params
    const pagination = await useServerPagination(pageProps)
    const driverLicenseId = DriverLicenseId.create(driverLicenseIdString)
    if(driverLicenseId instanceof Error) return <ErrorCallout>{driverLicenseId.message}</ErrorCallout>
    const showDriverUseCase = createShowDriverUseCase(driverRepository)
    const result = await showDriverUseCase({driverLicenseId})
    if(!result.success) return <div>{result.error.message}</div>
    const driver : DriverDTO = {
        driverLicenseId: result.value.driverLicenseId.getValue(),
        firstName: result.value.firstName,
        lastName: result.value.lastName,
        email: result.value.email,
        driverLicensedAt : result.value.driverLicensedAt,
        documents: result.value.documents
    }

    const driverPath = `/drivers/${driverLicenseId.getValue()}`

    return (
        <div>
            <h1 className={"text-xl font-semibold"}>DriverDetailPage {driverLicenseId.getValue()}</h1>
            <DriverPatchForm driver={driver}/>

            <br/>
            <hr/>
            <br/>
            <div className="flex gap-4">
                <Link href={`${driverPath}/incidents`} >
                    <Button>
                        Accéder aux incidents
                    </Button>
                </Link>

                <Link href={`${driverPath}/test-drives`}>
                    <Button>
                        Accéder aux tests de conduite
                    </Button>
                </Link>

            </div>


        </div>
    );
}