import {createListDriversUseCase} from "@application/testDrive/usecases/driver/ListDriversUseCase";
import {driverRepository} from "@infrastructure/frameworks/core/repositories/testDrive/driverRepository"
import DriverRegisterForm from "@/app/drivers/DriverRegisterForm";
import Chip from "@/components/Chip";
import Pagination from "@/components/Pagination";
import List from "@/components/List";
import {Driver} from "@domain/testDrive/entities/Driver";
import ListItem from "@/components/ListItem";
import {useServerPagination} from "@/hooks/useServerPagination";
export default async function DriversPage(pageProps : {searchParams: any}){
    const listDriversUseCase = createListDriversUseCase(driverRepository)
    const result = await listDriversUseCase(await useServerPagination(pageProps))
    if(!result.success) return <div>{result.error.message}</div>
    const {value,...pagination} = result
    return <div className={"flex flex-col gap-6"}>
        <h1 className={'text-xl font-semibold'}>Liste des conducteurs</h1>
        <List>
            {
                value.map((driver :  Driver)=> (
                    <ListItem link={`/drivers/${driver.driverLicenseId.getValue()}`}>
                        <Chip>#{driver.driverLicenseId.getValue()}</Chip> {driver.firstName} {driver.lastName}
                    </ListItem>
                ))
            }
        </List>
        <Pagination {...pagination}/>
        <DriverRegisterForm/>
    </div>
}