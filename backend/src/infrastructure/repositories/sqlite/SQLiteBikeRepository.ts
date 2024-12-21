import {BikeRepository} from "../../../application/repositories/BikeRepository";
import {AbstractSQLiteRepository} from "./AbstractSQLiteRepository";
import {Immatriculation} from "../../../domain/value-objects/Immatriculation";
import {Bike} from "../../../domain/entities/Bike";
import {Price} from "../../../domain/value-objects/Price";

export class SQLiteBikeRepository extends AbstractSQLiteRepository implements BikeRepository {
    tableName = 'bikes';
    async index() {
        return [];
    }
    async show(immatriculation : Immatriculation)  {
        const bike = await this.getQuery().where('immatriculation', immatriculation.getValue).first();
        if (!bike) {
            throw new Error('Bike not found');
        }
        const price = new Price(bike.price);
        return new Bike(immatriculation, bike.brandSiret, bike.model, bike.year, price);
    }

    async store(bike: Bike) {
        await this.getQuery().insert({
            immatriculation: bike.immatriculation.getValue(),
            brandSiret: bike.brandSiret,
            model: bike.model,
            year: bike.year,
            price: bike.price.getValue()
        });
    }

    async update(bike: Bike) {
        await this.getQuery()
            .where('immatriculation', bike.immatriculation.getValue)
            .update({
                brandSiret: bike.brandSiret,
                model: bike.model,
                year: bike.year,
                price: bike.price.getValue()
            });
    }

    async delete(immatriculation: Immatriculation) {
        await this.getQuery().where('immatriculation', immatriculation.getValue).delete();
    }
}