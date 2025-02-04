import {listGarageUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/garage/listGarageUseCase";
import {useServerPagination} from "@/hooks/useServerPagination";
import GarageRegisterForm from "@/app/garages/GarageRegisterForm";
import Chip from "@/components/Chip";
import Pagination from "@/components/Pagination";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import HeadingTile from "@/components/HeadingTitle";
import {Garage} from "@domain/maintenance/entities/Garage";

export default async function GaragesPage(pageProps: { searchParams: any }) {
    const result = await listGarageUseCase(await useServerPagination(pageProps))
    if (!result.success) return <div>{result.error.message}</div>
    const { value, ...pagination } = result
    return <div className={"flex flex-col gap-6"}>
        <HeadingTile>Liste des garages</HeadingTile>
        <List>
            {
                value.map((garage: Garage) => (
                    <ListItem key={garage.siret.getValue()} link={`/garages/${garage.siret}`}>
                        <Chip>#{garage.siret.getValue()}</Chip> {garage.name}
                    </ListItem>
                ))
            }
        </List>
        <Pagination {...pagination} />
        <GarageRegisterForm />
    </div>
}