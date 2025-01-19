import {useServerPagination} from "@/hooks/useServerPagination";
import {createListDealerUseCase} from "@application/inventoryManagement/usecases/dealer/listDealerUseCase";
import {dealerRepository} from "@infrastructureCore/repositories/inventoryManagement/dealerRepository";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import Chip from "@/components/Chip";
import Pagination from "@/components/Pagination";

export default async function DealersListPage(pageProps: {searchParams: any}) {
    const paginationQuery = await useServerPagination(pageProps);
    const listDealerUseCase = createListDealerUseCase(dealerRepository)
    const response = await listDealerUseCase(paginationQuery)
    if(!response.success) return <div>
        {response.error.message}
    </div>
    const {value,...pagination} = response
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
        </>
    )
}