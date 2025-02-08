import {useServerPagination} from "@/hooks/useServerPagination";
import Chip from "@/components/Chip";
import Pagination from "@/components/Pagination";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import HeadingTile from "@/components/HeadingTitle";
import {listVehiclesUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/vehicle/listVehiclesUseCase";
import {Vehicle} from "@domain/maintenance/entities/Vehicle";
import VehicleRegisterForm from "@/app/vehicles/VehicleRegisterForm";

export default async function VehiclesPage(pageProps: {searchParams: any}) {
    const result = await listVehiclesUseCase(await useServerPagination(pageProps));
    if (!result.success) return <div>{result.error.message}</div>;
    const {value, ...pagination} = result;
    return <div className={"flex flex-col gap-6"}>
        <HeadingTile>Liste des véhicules</HeadingTile>
        <List>
            {value.map((vehicle: Vehicle) => (
                <ListItem
                    key={vehicle.immatriculation.getValue()}
                    link={`/vehicles/${vehicle.immatriculation.getValue()}`}
                >
                    <div className="flex items-center gap-4">
                        <Chip>
                            #{vehicle.vin.getValue()}
                        </Chip>
                        <span className="font-semibold text-gray-800">{vehicle.model}</span>
                    </div>

                    <div className="text-sm text-gray-600">
                        <span className="italic font-bold">{vehicle.immatriculation.getValue()}</span>
                        <span> ({vehicle.year})</span>
                    </div>
                </ListItem>
            ))}
        </List>
        <Pagination {...pagination}/>
        <VehicleRegisterForm />
    </div>
}