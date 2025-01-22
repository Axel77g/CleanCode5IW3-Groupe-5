"use server";
import {useServerPagination} from "@/hooks/useServerPagination";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {createListDriverTestDrivesUseCase} from "@application/testDrive/usecases/testDrive/ListDriverTestDrivesUseCase";
import {testDriveRepository} from "@infrastructureCore/repositories/testDrive/testDriveRepository";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import Chip from "@/components/Chip";
import DriverTestDriveForm from "@/app/drivers/[driverLicenseId]/test-drives/DriverTestDriveForm";
import Pagination from "@/components/Pagination";

export default async function DriverTestDrivesPage(pageProps : {searchParams: any, params: any}){
    const {driverLicenseId: driverLicenseString} = await pageProps.params;
    const paginationQuery = await useServerPagination(pageProps)
    const driverLicenseId = DriverLicenseId.create(driverLicenseString)
    if(driverLicenseId instanceof Error) return <div>{driverLicenseId.message}</div>
    const listDriverTestDriveUseCase = createListDriverTestDrivesUseCase(testDriveRepository, driverRepository);
    const response = await listDriverTestDriveUseCase({driverLicenseId,...paginationQuery})
    if(!response.success) return <div>{response.error.message}</div>
    const {value,...pagination} = response
    return <div>
        <List>
            {
                value.map(testDrive => (
                    <ListItem link="test" key={testDrive.testDriveId}>
                        <Chip>#{testDrive.vehicleImmatriculation.getValue()}</Chip> {testDrive.period.startDate.toISOString()} - {testDrive.period.endDate.toISOString()}
                    </ListItem>
                ))
            }
        </List>

        <Pagination {...pagination}/>
        <hr/>
        <DriverTestDriveForm driverLicenseId={driverLicenseId.getValue()}/>
    </div>
}