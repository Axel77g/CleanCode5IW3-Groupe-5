"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Immatriculation = void 0;
var Immatriculation = /** @class */ (function () {
    function Immatriculation(immatriculation) {
        this.immatriculation = immatriculation;
        if (!this.isValid()) {
            throw new Error('Invalid immatriculation');
        }
    }
    Immatriculation.prototype.isValid = function () {
        var immatriculationValidRegex = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/;
        return immatriculationValidRegex.test(this.immatriculation);
    };
    Immatriculation.prototype.getValue = function () {
        return this.immatriculation;
    };
    return Immatriculation;
}());
exports.Immatriculation = Immatriculation;
