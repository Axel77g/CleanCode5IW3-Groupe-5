import {Controller} from "@expressApp/types/Controller";
import {Response} from "@expressApp/core/Response";
import {createListDriversUseCase} from "@application/testDrive/usecases/driver/ListDriversUseCase";
import {driverRepository} from "@expressApp/repositories/testDrive/driverRepository";
import {paginatedRequest} from "@expressApp/requests/paginatedRequest";
export const listDriversController : Controller<typeof paginatedRequest> = async (input) => {
    const listDriversUseCase = createListDriversUseCase(driverRepository)
    const result = await listDriversUseCase(input)
    if(!result.success) return Response.Fail(400, result.error.message)
    return Response.SuccessPaginated(result.value, result.total, input.page, input.limit)
}