import {Result} from "./Result";

export interface IInputUseCase{}
export interface IOutputUseCase{
    message: string
    error : boolean
}

/*export interface IUseCase<TI extends IInputUseCase, TR extends Result<any>>{
    execute(input : TI): Promise<TR>
}*/

export type IUseCase<TI extends IInputUseCase, TR extends Result<any>> = (input : TI) =>  Promise<TR>

