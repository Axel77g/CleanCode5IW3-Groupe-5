import {Knex} from "knex";

export abstract class AbstractKnexRepository {
    protected abstract tableName: string;
    constructor(
        protected connection: Knex,
    ) {}

    protected getQuery(tableName: string = this.tableName)
    {
        return this.connection(tableName);
    }

}