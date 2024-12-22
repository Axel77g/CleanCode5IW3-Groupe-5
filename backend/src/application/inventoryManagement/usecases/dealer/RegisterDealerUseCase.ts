import {AbstractUseCaseException, IInputUseCase, IOutputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DealerRepository} from "../../repositories/DealerRepository";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";
import {Dealer} from "../../../../domain/inventoryManagement/entities/Dealer";
import {DealerAddress} from "../../../../domain/inventoryManagement/value-object/DealerAddress";

interface RegisterDealerInput extends IInputUseCase{
    siret: DealerSiret,
    name: string,
    address: DealerAddress,
    phoneNumber: string
}

interface RegisterDealerOutput extends IOutputUseCase{}

class CannotRegisterDealerError extends AbstractUseCaseException implements RegisterDealerOutput{
    constructor() {
        super("Cannot register dealer");
    }
}

export class RegisterOrderUseCase implements IUseCase<RegisterDealerInput, RegisterDealerOutput> {

    constructor(private _dealerRepository: DealerRepository)
    {}

    async execute(input: RegisterDealerInput): Promise<RegisterDealerOutput> {
        const dealer = new Dealer(
            input.siret,
            input.name,
            input.address,
            input.phoneNumber
        );

        const storeResponse = await this._dealerRepository.store(dealer);
        if(storeResponse.hasError()){
            return new CannotRegisterDealerError()
        }

        return {
            message: "Dealer registered successfully",
            error: false
        }
    }
}