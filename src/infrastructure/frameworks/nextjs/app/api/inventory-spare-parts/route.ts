import {getInventorySpareParts} from "@/app/inventory-spare-parts/actions";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const pagination = {
        limit: Number(searchParams.get("limit")),
        page: Number(searchParams.get("page"))
    }
    const search = searchParams.get('search') || undefined
    const result = await getInventorySpareParts(pagination,search)
    if(!result.success) return new Response(result.error.message)
    return new Response(JSON.stringify(result.value), {status: 200});
}