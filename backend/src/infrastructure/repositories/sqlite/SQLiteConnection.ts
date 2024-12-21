import knex, {Knex} from "knex"
export class SQLiteConnection{
    private readonly connection : Knex;
    constructor(knexConfiguration : Knex.Config) {
        this.connection = knex(knexConfiguration);
    }

    getConnection(){
        return this.connection;
    }

    async close(){
        await this.connection.destroy();
    }

}