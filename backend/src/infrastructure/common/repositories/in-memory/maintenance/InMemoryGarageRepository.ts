import { GarageRepository } from "@application/maintenance/repositories/GarageRepository";
import { Garage } from "@domain/maintenance/entities/Garage";
import { Siret } from "@domain/shared/value-object/Siret";
import { PaginatedInput } from "@shared/PaginatedInput";
import { OptionalResult, PaginatedResult, Result, VoidResult } from "@shared/Result";
import { AbstractInMemoryRepository } from "../AbstractInMemoryRepository";

export class InMemoryGarageRepository extends AbstractInMemoryRepository<Garage> implements GarageRepository {
    async list(pagination: PaginatedInput): Promise<PaginatedResult<Garage>> {
        const { page, limit } = pagination
        const garages = this.collection.paginate(page, limit).toArray()
        const total = this.collection.count()
        return Promise.resolve(Result.SuccessPaginated(garages, total, page, limit))
    }

    async getBySiret(siret: Siret): Promise<OptionalResult<Garage>> {
        const garage = this.collection.findOne('siret', siret)
        return garage ? Result.Success(garage) : Result.SuccessVoid()
    }

    async show(siret: Siret): Promise<Result<Garage>> {
        const garage = this.collection.findOne('siret', siret)
        return garage ? Result.Success(garage) : Result.FailureStr('Garage not found')
    }

    async store(garage: Garage): Promise<VoidResult> {
        this.collection.add(garage)
        return Result.SuccessVoid()
    }

    async delete(siret: Siret): Promise<VoidResult> {
        this.collection.remove('siret', siret)
        return Result.SuccessVoid()
    }
}