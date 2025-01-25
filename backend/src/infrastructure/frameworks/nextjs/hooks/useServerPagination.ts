"use server";

export interface PaginationObject {
    page: number,
    limit: number
}
export async function useServerPagination(pageProps : {searchParams : Promise<any>}) : Promise<PaginationObject>{
    const searchParams = await pageProps.searchParams
    return {
        page: Number(searchParams.page) || 1,
        limit: Number(searchParams.limit) || 10
    }
}