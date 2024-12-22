import {IInputUseCase, IOutputUseCase, IUseCase} from "../../../shared/IUseCase";

interface RegisterOrderInput extends IInputUseCase{
    bikeId: string
    customerId: string
    startDate: Date
    endDate: Date
    status: string
}

interface RegisterOrderOutput extends IOutputUseCase{
    message: string
}

export class RegisterOrderUseCase implements IUseCase<RegisterOrderInput, RegisterOrderOutput>{

    async execute(input: RegisterOrderInput): Promise<RegisterOrderOutput> {
        return {
            message: "Order registered successfully"
        }
    }
}