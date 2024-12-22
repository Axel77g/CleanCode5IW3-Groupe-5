import {AbstractRepositoryResponse} from "../../../shared/IRepository";

export class KnexRepositoryResponse<T> extends AbstractRepositoryResponse<T>{
    constructor(value : T | null = null ,error: boolean = false){
        super(value,error)
    }
}