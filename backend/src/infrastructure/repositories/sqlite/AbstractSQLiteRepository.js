"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSQLiteRepository = void 0;
var AbstractSQLiteRepository = /** @class */ (function () {
    function AbstractSQLiteRepository(connection) {
        this.connection = connection;
    }
    AbstractSQLiteRepository.prototype.getQuery = function () {
        return this.connection.getConnection()(this.tableName);
    };
    return AbstractSQLiteRepository;
}());
exports.AbstractSQLiteRepository = AbstractSQLiteRepository;
