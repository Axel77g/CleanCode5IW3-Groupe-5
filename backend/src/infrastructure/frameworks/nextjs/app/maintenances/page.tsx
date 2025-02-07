import {useServerPagination} from "@/hooks/useServerPagination";
import HeadingTile from "@/components/HeadingTitle";
import MaintenanceRegisterForm from "@/app/maintenances/MaintenanceRegisterForm";
import Pagination from "@/components/Pagination";
import {
    listMaintenanceUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/maintenance/listMaintenanceUseCase";

export default async function MaintenancesPage(pageProps: {searchParams: any}) {
    const result = await listMaintenanceUseCase(await useServerPagination(pageProps))
    if(!result.success) return <div>{result.error.message}</div>
    // const {value, ...pagination} = result
    return <div className={"flex flex-col gap-6"}>
        <HeadingTile>Liste des maintenances</HeadingTile>
        {/*<Pagination {...pagination} />*/}
        <MaintenanceRegisterForm/>
    </div>
}