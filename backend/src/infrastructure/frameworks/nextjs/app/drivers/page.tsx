import {createListDriversUseCase} from "@application/testDrive/usecases/driver/ListDriversUseCase";
import {driverRepository} from "@infrastructure/frameworks/core/repositories/testDrive/driverRepository"
import Link from "next/link";
import DriverRegisterForm from "@/app/drivers/DriverRegisterForm";
import Chip from "@/components/Chip";
import {Button} from "@/components/Button";
import Pagination from "@/components/Pagination";
export default async function DriversPage(pageProps){
    const searchParams = await pageProps.searchParams
    const listDriversUseCase = createListDriversUseCase(driverRepository)
    const result = await listDriversUseCase({page: Number(searchParams.page) || 1, limit: Number(searchParams.limit) || 10})
    if(!result.success) return <div>{result.error.message}</div>
    const {value,...pagination} = result
    return <div class={"flex flex-col gap-6"}>
        <h1 className={'text-xl font-semibold'}>Liste des conducteurs</h1>
        <div className="divide-y divide-dashed">
            {result.value.map((driver) => (
                <Link key={driver.driverLicenseId.getValue()} className={"flex gap-3 p-3 items-center hover:bg-gray-50"} href={'/drivers/'+driver.driverLicenseId.getValue()}>
                         <Chip>#{driver.driverLicenseId.getValue()}</Chip> {driver.firstName} {driver.lastName}
                </Link>

            ))}
        </div>
        <Pagination {...pagination}/>
        <DriverRegisterForm/>
    </div>
}