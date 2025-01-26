import {InMemoryDataCollection} from "@infrastructure/common/repositories/in-memory/InMemoryDataCollection";

export class AbstractInMemoryRepository<T extends Record<string, any>> {
    protected collection: InMemoryDataCollection<T> = new InMemoryDataCollection([]);
}