import {useServerPagination} from "@/hooks/useServerPagination";
import List from "@/components/List";
import Chip from "@/components/Chip";
import ListItem from "@/components/ListItem";
import Pagination from "@/components/Pagination";
import GarageRegisterForm from "@/app/garages/GarageRegisterForm";
import HeadingTile from "@/components/HeadingTitle";
import {listGarageUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/garage/listGarageUseCase";

export default async function GaragesListPage(pageProps: {searchParams: any}) {
    const paginationQuery = await useServerPagination(pageProps)
    const response = await listGarageUseCase(paginationQuery);
    if (!response.success) return <div>
        {response.error.message}
    </div>
    const {value, ...pagination} = response;
    return (
        <>
            <HeadingTile>Liste des garages</HeadingTile>

            <List >
                {
                    value.map(garage => (
                        <ListItem link={`/garages/${garage.siret.getValue()}`} key={garage.siret.getValue()}>
                            <Chip>{garage.siret.getValue()}</Chip>
                            {garage.name}
                        </ListItem>
                    ))
                }
            </List>
            <Pagination {...pagination} />


            <br/>
            <hr/>
            <br/>

            <GarageRegisterForm />
        </>
    )
}