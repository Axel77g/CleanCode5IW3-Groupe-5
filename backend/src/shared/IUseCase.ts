export interface IInputUseCase{}
export interface IOutputUseCase{}
export interface IUseCase<TI extends IInputUseCase, TR extends IOutputUseCase>{
    execute(input : TI): Promise<TR>
}