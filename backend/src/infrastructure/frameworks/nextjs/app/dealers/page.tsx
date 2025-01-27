import {useServerPagination} from "@/hooks/useServerPagination";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import Chip from "@/components/Chip";
import Pagination from "@/components/Pagination";
import DealerRegisterForm from "@/app/dealers/DealerRegisterForm";
import {ErrorCallout} from "@/components/ErrorCallout";
import {listDealersUseCase} from "@infrastructureCore/useCaseImplementation/InventoryManagement/listDealersUseCase";

export default async function DealersListPage(pageProps: {searchParams: any}) {
    const paginationQuery = await useServerPagination(pageProps);
    const result = await listDealersUseCase(paginationQuery)
    if(!result.success) return <ErrorCallout>{result.error.message}</ErrorCallout>
    const {value,...pagination } = result
    return (
        <>
            <List>
                {
                    value.map(dealer=>(
                        <ListItem link={`/dealers/${dealer.siret.getValue()}`}>
                            <Chip>{dealer.siret.getValue()}</Chip>
                            {dealer.name}
                        </ListItem>
                    ))
                }
            </List>
            <Pagination {...pagination} />


            <br/>
            <hr/>
            <br/>

            <DealerRegisterForm/>
        </>
    )
}