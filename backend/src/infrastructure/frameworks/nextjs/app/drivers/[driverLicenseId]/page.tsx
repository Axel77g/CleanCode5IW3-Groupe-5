import {createShowDriverUseCase} from "@application/testDrive/usecases/driver/ShowDriverUseCase";
import {driverRepository} from "@infrastructure/frameworks/core/repositories/testDrive/driverRepository";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import DriverPatchForm from "@/app/drivers/[driverLicenseId]/DriverPatchForm";
import {DriverDTO} from "@domain/testDrive/entities/Driver";
export default async function DriverDetailPage({params}) {
    const {driverLicenseId : driverLicenseIdString} = await params
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
        </div>
    );
}