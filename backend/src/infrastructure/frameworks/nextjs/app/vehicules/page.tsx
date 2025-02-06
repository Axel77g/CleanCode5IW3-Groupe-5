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
        <List>
            {value.map((vehicule: Vehicule) => (
                <ListItem
                    key={vehicule.immatriculation.getValue()}
                    link={`/vehicules/${vehicule.immatriculation.getValue()}`}
                >
                    <div className="flex items-center gap-4">
                        <Chip>
                            #{vehicule.vin.getValue()}
                        </Chip>
                        <span className="font-semibold text-gray-800">{vehicule.model}</span>
                    </div>

                    <div className="text-sm text-gray-600">
                        <span className="italic font-bold">{vehicule.immatriculation.getValue()}</span>
                        <span> ({vehicule.year})</span>
                    </div>
                </ListItem>
            ))}
        </List>
        <Pagination {...pagination}/>
        <VehiculeRegisterForm />
    </div>
}