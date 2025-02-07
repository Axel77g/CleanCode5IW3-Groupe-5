import {NextRequest} from "next/server";
import {getVehicules} from "@/app/vehicules/actions";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const pagination = {
        limit: Number(searchParams.get("limit")),
        page: Number(searchParams.get("page"))
    }
    const result = await getVehicules(pagination)
    if(!result.success) return new Response(result.error.message)
    return new Response(JSON.stringify(result.value), {status: 200});
}