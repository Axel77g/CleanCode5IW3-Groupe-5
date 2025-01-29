"use server";
import {useServerPagination} from "@/hooks/useServerPagination";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import Chip from "@/components/Chip";
import DriverTestDriveForm from "@/app/drivers/[driverLicenseId]/test-drives/DriverTestDriveForm";
import Pagination from "@/components/Pagination";
import {
    listDriverTestsDrivesUseCase
} from "@infrastructureCore/useCaseImplementation/testDrive/listDriverTestsDrivesUseCase";
import {ErrorCallout} from "@/components/ErrorCallout";

export default async function DriverTestDrivesPage(pageProps : {searchParams: any, params: any}){
    const {driverLicenseId} = await pageProps.params as {driverLicenseId: string};
    const paginationQuery = await useServerPagination(pageProps)
    const result = await listDriverTestsDrivesUseCase({driverLicenseId,...paginationQuery})
    if(!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const {value, ...pagination} = result
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
        <DriverTestDriveForm driverLicenseId={driverLicenseId}/>
    </div>
}