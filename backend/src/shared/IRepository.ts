import {Result} from "./Result";

type RepositoryMethod<T> = (...args: any[]) => Promise<Result<T>>;
export interface IRepository{
    // [key: string]: RepositoryMethod<any>
}