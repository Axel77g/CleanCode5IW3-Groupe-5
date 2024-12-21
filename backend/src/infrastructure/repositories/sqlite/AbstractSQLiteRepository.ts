import {SQLiteConnection} from "./SQLiteConnection";
import {Knex, QueryBuilder} from "knex";

export abstract class AbstractSQLiteRepository {
    protected abstract tableName: string;
    constructor(
        protected connection: SQLiteConnection,
    ) {}

    protected getQuery()
    {
        return this.connection.getConnection()(this.tableName);
    }
}