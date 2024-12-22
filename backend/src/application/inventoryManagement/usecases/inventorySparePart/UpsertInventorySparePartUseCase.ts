import {AbstractUseCaseException, IInputUseCase, IOutputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {InventorySparePartRepository} from "../../repositories/InventorySparePartRepository";
import {InventorySparePart} from "../../../../domain/inventoryManagement/entities/InventorySparePart";
import {GetInventorySparePartUseCase} from "./GetInventorySparePartUseCase";

interface UpsertInventorySparePartInput extends IInputUseCase{
    reference: string,
    name: string
}

interface UpsertInventorySparePartOutput extends IOutputUseCase{}

class CannotAddSparePartInStock extends AbstractUseCaseException implements UpsertInventorySparePartOutput{
    constructor(message: string = `Cannot add spare part`){
        super(message);
    }
}

export class UpsertInventorySparePartUseCase implements IUseCase<UpsertInventorySparePartInput, UpsertInventorySparePartOutput> {

    constructor( private _sparePartRepository: InventorySparePartRepository, private _getInventorySparePartUseCase: GetInventorySparePartUseCase)
    {}

    async execute(input: UpsertInventorySparePartInput): Promise<UpsertInventorySparePartOutput> {
        const getSpartPartUseCaseResponse = await this._getInventorySparePartUseCase.execute({reference: input.reference});
        if(getSpartPartUseCaseResponse.sparePart != null && !getSpartPartUseCaseResponse.error){
            const updatedSparePart = getSpartPartUseCaseResponse.sparePart.setName(input.name);
            const updateResponse = await this._sparePartRepository.update(updatedSparePart);
            if(updateResponse.hasError()) return new CannotAddSparePartInStock("Cannot update spare part")
        }else{
            const sparePart = new InventorySparePart(input.reference, input.name);
            const createResponse = await this._sparePartRepository.create(sparePart);
            if(createResponse.hasError()) return new CannotAddSparePartInStock()
        }
        return {
            message: "Spare part create / updated successfully",
            error: false
        }
    }
}