import {createShowDriverUseCase} from "@application/testDrive/usecases/driver/ShowDriverUseCase";
import {driverRepository} from "@infrastructure/frameworks/core/repositories/testDrive/driverRepository";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import DriverPatchForm from "@/app/drivers/[driverLicenseId]/DriverPatchForm";
import {DriverDTO} from "@domain/testDrive/entities/Driver";
import {useServerPagination} from "@/hooks/useServerPagination";
import DriverIncidentsList from "@/app/drivers/[driverLicenseId]/DriverIncidentsList";
export default async function DriverDetailPage(pageProps: {params: any, searchParams:any}) {
    const {driverLicenseId : driverLicenseIdString} = await pageProps.params
    const pagination = await useServerPagination(pageProps)
    const driverLicenseId = DriverLicenseId.create(driverLicenseIdString)
    if(driverLicenseId instanceof Error) return <div>{driverLicenseId.message}</div>
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
    console.log(driver)
    return (
        <div>
            <h1 className={"text-xl font-semibold"}>DriverDetailPage {driverLicenseId.getValue()}</h1>
            <DriverPatchForm driver={driver}/>
            <DriverIncidentsList driver={result.value} pagination={pagination} />
        </div>
    );
}