import {createListDriversUseCase} from "@application/testDrive/usecases/driver/ListDriversUseCase";
import {driverRepository} from "@infrastructure/frameworks/core/repositories/testDrive/driverRepository"
import DriverRegisterForm from "@/app/drivers/DriverRegisterForm";
import Chip from "@/components/Chip";
import Pagination from "@/components/Pagination";
import List from "@/components/List";
import {Driver} from "@domain/testDrive/entities/Driver";
import ListItem from "@/components/ListItem";
import {useServerPagination} from "@/hooks/useServerPagination";
import HeadingTile from "@/components/HeadingTitle";
export default async function DriversPage(pageProps : {searchParams: any}){
    const listDriversUseCase = createListDriversUseCase(driverRepository)
    const result = await listDriversUseCase(await useServerPagination(pageProps))
    if(!result.success) return <div>{result.error.message}</div>
    const {value,...pagination} = result
    return <div className={"flex flex-col gap-6"}>
        <HeadingTile>Liste des conducteurs</HeadingTile>
        <List>
            {
                value.map((driver :  Driver)=> (
                    <ListItem key={driver.driverLicenseId.getValue()} link={`/drivers/${driver.driverLicenseId.getValue()}`}>
                        <Chip>#{driver.driverLicenseId.getValue()}</Chip> {driver.firstName} {driver.lastName}
                    </ListItem>
                ))
            }
        </List>
        <Pagination {...pagination}/>
        <DriverRegisterForm/>
    </div>
}