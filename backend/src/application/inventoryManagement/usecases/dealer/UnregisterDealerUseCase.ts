import {AbstractUseCaseException, IInputUseCase, IOutputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DealerRepository} from "../../repositories/DealerRepository";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";

interface UnregisterDealerInput extends IInputUseCase{
    dealerSiret: DealerSiret
}

interface UnregisterDealerOutput extends IOutputUseCase {}

class CannotUnregisterDealerError extends AbstractUseCaseException implements UnregisterDealerOutput{
    constructor() {
        super("Cannot unregister dealer");
    }
}

export class UnregisterDealerUseCase implements IUseCase<UnregisterDealerInput, UnregisterDealerOutput>{
    constructor(private _dealerRepository: DealerRepository)
    {}
    async execute(input: UnregisterDealerInput): Promise<UnregisterDealerOutput> {
        const deleteResponse = await this._dealerRepository.delete(input.dealerSiret)

        if(deleteResponse.hasError()){
            return new CannotUnregisterDealerError()
        }

        return {
            message: "Dealer found",
            error: false
        }
    }
}