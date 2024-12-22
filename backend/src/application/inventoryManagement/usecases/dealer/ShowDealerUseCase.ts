import {AbstractUseCaseException, IInputUseCase, IOutputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";
import {Dealer} from "../../../../domain/inventoryManagement/entities/Dealer";
import {DealerRepository} from "../../repositories/DealerRepository";

interface ShowDealerInput extends IInputUseCase{
    dealerSiret: DealerSiret
}

interface ShowDealerOutput extends IOutputUseCase {
    dealer: Dealer | null,
}

class NotFoundDealerError extends AbstractUseCaseException implements ShowDealerOutput{
    dealer: Dealer | null = null;
    constructor(){
        super("Dealer not found")

    }
}

export class ShowDealerUseCase implements IUseCase<ShowDealerInput, ShowDealerOutput>{
    constructor(private _dealerRepository: DealerRepository)
    {}
    async execute(input: ShowDealerInput): Promise<ShowDealerOutput> {
        const findResponse = await this._dealerRepository.getBySiret(input.dealerSiret)

        if(findResponse.hasError() || findResponse.empty()){
            return new NotFoundDealerError()
        }

        return {
            dealer: findResponse.value,
            message: "Dealer found",
            error: false
        }
    }
}