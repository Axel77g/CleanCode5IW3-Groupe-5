import {AbstractUseCaseException, IInputUseCase, IOutputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {OrderRepository} from "../../repositories/OrderRepository";
import {Order} from "../../../../domain/inventoryManagement/entities/Order";
import {Dealer} from "../../../../domain/inventoryManagement/entities/Dealer";
import {OrderLine} from "../../../../domain/inventoryManagement/value-object/OrderLine";

interface RegisterOrderInput extends IInputUseCase{
    dealer: Dealer,
    deliveryDate: Date,
    orderedDate: Date,
    orderLines: OrderLine[]
}

interface RegisterOrderOutput extends IOutputUseCase{}

class CannotRegisterOrder extends AbstractUseCaseException implements RegisterOrderOutput{
    constructor(){
        super("Cannot register order")
    }
}

export class RegisterOrderUseCase implements IUseCase<RegisterOrderInput, RegisterOrderOutput> {

    constructor(private _orderRepository: OrderRepository)
    {}

    async execute(input: RegisterOrderInput): Promise<RegisterOrderOutput> {

        const order = new Order(
            Order.generateID(),
            input.orderedDate,
            input.deliveryDate,
            input.dealer,
            input.orderLines
        );

        const repositoryResponse = await this._orderRepository.store(order);
        if(repositoryResponse.hasError()){
            return new CannotRegisterOrder()
        }

        return {
            message: "Order registered successfully",
            error: false
        }
    }
}