export interface IInputUseCase{}
export interface IOutputUseCase{
    message: string
    error : boolean
}

export abstract class AbstractUseCaseException extends Error implements IOutputUseCase{
    message: string;
    error: boolean;
    constructor(message: string) {
        super(message);
        this.message = message;
        this.error = true;
    }
}

export interface IUseCase<TI extends IInputUseCase, TR extends IOutputUseCase>{
    execute(input : TI): Promise<TR>
}