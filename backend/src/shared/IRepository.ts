import {Dealer} from "../domain/inventoryManagement/entities/Dealer";

export abstract class AbstractRepositoryResponse<T>{
    private error: boolean
    value: T | null

    constructor(value: T | null = null, error: boolean = false)
    {
        this.value = value
        this.error = error
    }
    hasError(): boolean
    {
        return this.error
    }
    empty(): boolean
    {
        return this.value == null
    }
}

type RepositoryMethod<T> = (...args: any[]) => Promise<AbstractRepositoryResponse<T>>;
export interface IRepository{
    //[key: string]: RepositoryMethod<any>

}