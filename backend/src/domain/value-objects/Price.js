"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Price = void 0;
var CurrencyEnum_1 = require("../enum/CurrencyEnum");
var Price = /** @class */ (function () {
    function Price(price, currency) {
        if (currency === void 0) { currency = CurrencyEnum_1.CurrencyEnum.EUR; }
        this.price = price;
        this.currency = currency;
        if (!this.isValid()) {
            throw new Error('Invalid price');
        }
    }
    Price.prototype.isValid = function () {
        return this.price >= 0;
    };
    Price.prototype.getValue = function () {
        return this.price;
    };
    Price.prototype.setValue = function (price) {
        return new Price(price, this.currency);
    };
    Price.prototype.getCurrency = function () {
        return this.currency;
    };
    Price.prototype.setCurrency = function (currency) {
        return new Price(this.price, currency);
    };
    Price.prototype.getFormattedValue = function () {
        return "".concat(this.price, " ").concat(this.currency);
    };
    return Price;
}());
exports.Price = Price;
