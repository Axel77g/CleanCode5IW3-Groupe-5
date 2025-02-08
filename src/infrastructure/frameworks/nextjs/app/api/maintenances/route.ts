import {NextRequest} from "next/server";
import {
    listVehicleMaintenanceUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicle/listVehicleMaintenanceUseCase";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const pagination = {
        limit: Number(searchParams.get("limit")),
        page: Number(searchParams.get("page"))
    }
    const immatriculation = searchParams.get("immatriculation")
    if (!immatriculation) return new Response("Immatriculation is required", {status: 422})
    const result = await listVehicleMaintenanceUseCase({
        ...pagination,
        immatriculation,
    })
    if(!result.success) return new Response(result.error.message)
    return new Response(JSON.stringify(result.value), {status: 200});
}