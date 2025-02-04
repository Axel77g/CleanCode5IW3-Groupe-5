import {useServerPagination} from "@/hooks/useServerPagination";
import Chip from "@/components/Chip";
import Pagination from "@/components/Pagination";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import HeadingTile from "@/components/HeadingTitle";
import {listVehiculesUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/vehicule/listVehiculesUseCase";
import {Vehicule} from "@domain/maintenance/entities/Vehicule";
import VehiculeRegisterForm from "@/app/vehicules/VehiculeRegisterForm";

export default async function VehiculesPage(pageProps: {searchParams: any}) {
    const result = await listVehiculesUseCase(await useServerPagination(pageProps));
    if (!result.success) return <div>{result.error.message}</div>;
    const {value, ...pagination} = result;
    return <div className={"flex flex-col gap-6"}>
        <HeadingTile>Liste des véhicules</HeadingTile>
        {/*<List>*/}
        {/*    {*/}
        {/*        value.map((vehicule :  Vehicule)=> (*/}
        {/*            <ListItem key={vehicule.vin.getValue()} link={`/vehicules/${vehicule.vin.getValue()}`}>*/}
        {/*                <Chip>#{vehicule.vin.getValue()}</Chip> {vehicule.model} <span className="italic font-bold text-sm">({vehicule.year})</span>*/}
        {/*            </ListItem>*/}
        {/*        ))*/}
        {/*    }*/}
        {/*</List>*/}
        <Pagination {...pagination}/>
        <VehiculeRegisterForm />
    </div>
}