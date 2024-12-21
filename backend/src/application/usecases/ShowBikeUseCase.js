"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowBikeUseCase = void 0;
var ShowBikeUseCase = /** @class */ (function () {
    function ShowBikeUseCase(bikeRepository) {
        this.bikeRepository = bikeRepository;
    }
    ShowBikeUseCase.prototype.execute = function (immatriculation) {
        return this.bikeRepository.show(immatriculation);
    };
    return ShowBikeUseCase;
}());
exports.ShowBikeUseCase = ShowBikeUseCase;
