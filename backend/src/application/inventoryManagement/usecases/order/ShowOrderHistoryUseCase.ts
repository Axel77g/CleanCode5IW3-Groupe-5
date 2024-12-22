import {AbstractUseCaseException, IInputUseCase, IOutputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";
import {ShowDealerUseCase} from "../dealer/ShowDealerUseCase";
import {Order} from "../../../../domain/inventoryManagement/entities/Order";
import {OrderRepository} from "../../repositories/OrderRepository";

interface ShowOrderHistoryInput extends IInputUseCase{
    dealerSiret: DealerSiret
}

interface ShowOrderHistoryOutput extends IOutputUseCase{
    orders: Order[]
}

class NoOrderHistoryFound extends AbstractUseCaseException implements ShowOrderHistoryOutput{
    orders: Order[] = [];
    constructor(){
        super("No order history found")
    }
}

export class ShowOrderHistoryUseCase implements IUseCase<ShowOrderHistoryInput, ShowOrderHistoryOutput>{
    constructor(
        private _showDealerUseCase: ShowDealerUseCase,
        private _orderRepository: OrderRepository
    )
    {}
    async execute(input: ShowOrderHistoryInput): Promise<ShowOrderHistoryOutput> {
        const dealerResponse = await this._showDealerUseCase.execute({dealerSiret: input.dealerSiret})
        if(dealerResponse.dealer === null){
            return new NoOrderHistoryFound()
        }
        const dealer = dealerResponse.dealer

        const findResponse = await this._orderRepository.findOrdersByDealer(dealer)
        if(findResponse.hasError() || findResponse.empty()){
            return new NoOrderHistoryFound()
        }

        return {
            orders: findResponse.value || [],
            message: "Order history found",
            error: false
        }
    }
}