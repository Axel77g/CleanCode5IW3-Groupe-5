import {Result} from "./Result";

export type IInputUseCase = object

/*export interface IUseCase<TI extends IInputUseCase, TR extends Result<any>>{
    execute(input : TI): Promise<TR>
}*/

export type IUseCase<TI extends IInputUseCase, TR extends Result<any>> = (input : TI) =>  Promise<TR>

