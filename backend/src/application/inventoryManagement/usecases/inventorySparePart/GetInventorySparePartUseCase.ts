import {AbstractUseCaseException, IInputUseCase, IOutputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {InventorySparePartRepository} from "../../repositories/InventorySparePartRepository";
import {InventorySparePart} from "../../../../domain/inventoryManagement/entities/InventorySparePart";

interface GetInventorySparePartInput extends IInputUseCase{
    reference: string,
}

interface GetInventorySparePartOutput extends IOutputUseCase{
    sparePart: InventorySparePart | null
}
class NotFoundSparePart extends AbstractUseCaseException implements GetInventorySparePartOutput{
    sparePart: InventorySparePart | null = null;
    constructor(message: string = `Spare part not found`){
        super(message);
    }
}

export class GetInventorySparePartUseCase implements IUseCase<GetInventorySparePartInput, GetInventorySparePartOutput> {

    constructor( private _sparePartRepository: InventorySparePartRepository)
    {}

    async execute(input: GetInventorySparePartInput): Promise<GetInventorySparePartOutput> {
        const findSparePartResponse = await this._sparePartRepository.find(input.reference);
        if(findSparePartResponse.hasError() || findSparePartResponse.empty()){
            return new NotFoundSparePart()
        }

        const sparePart = findSparePartResponse.value
        return {
            sparePart,
            message: "Spare part found",
            error: false
        }
    }
}