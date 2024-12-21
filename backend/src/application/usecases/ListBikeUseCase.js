"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListBikeUseCase = void 0;
var ListBikeUseCase = /** @class */ (function () {
    function ListBikeUseCase(bikeRepository) {
        this.bikeRepository = bikeRepository;
    }
    ListBikeUseCase.prototype.execute = function () {
        return this.bikeRepository.index();
    };
    return ListBikeUseCase;
}());
exports.ListBikeUseCase = ListBikeUseCase;
