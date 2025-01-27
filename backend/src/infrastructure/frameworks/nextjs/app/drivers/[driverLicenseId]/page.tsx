import DriverPatchForm from "@/app/drivers/[driverLicenseId]/DriverPatchForm";
import {DriverDTO} from "@domain/testDrive/entities/Driver";
import {Button} from "@/components/Button";
import Link from "next/link";
import {ErrorCallout} from "@/components/ErrorCallout";
import {showDriverUseCase} from "@infrastructureCore/useCaseImplementation/testDrive/showDriverUseCase";
export default async function DriverDetailPage(pageProps: {params: any, searchParams:any}) {
    const {driverLicenseId} = await pageProps.params
    const result = await showDriverUseCase({driverLicenseId})
    if(!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const driver : DriverDTO = {
            driverLicenseId: result.value.driverLicenseId.getValue(),
            firstName: result.value.firstName,
            lastName: result.value.lastName,
            email: result.value.email,
            birthDate: result.value.birthDate,
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