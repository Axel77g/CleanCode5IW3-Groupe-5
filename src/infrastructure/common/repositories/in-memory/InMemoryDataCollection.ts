export class InMemoryDataCollection<T extends Record<string, any>>{
    protected data: T[] = [];
    constructor(data: T[] = []) {
        this.data = data;
    }

    private handleValueObject<K extends keyof T>(identifier : K, value: T[K], element : T): boolean {
        if(typeof value === 'object' && typeof element[identifier] === 'object'){
            if('getValue' in value && 'getValue' in element[identifier]){
                return value.getValue() === element[identifier].getValue();
            }
            else return JSON.stringify(value) === JSON.stringify(element[identifier]);
        }
        else return value === element[identifier];
    }

    add(entity: T): void {
        this.data.push(entity);
    }

    replace<K extends keyof T>(identifier : K, identifierValue : T[K], entity: T): void {
        const index = this.data.findIndex((element) => this.handleValueObject(identifier, identifierValue, element));
        this.data[index] = entity;
    }

    remove<K extends keyof T>(identifier: K, value: T[K]): void {
        this.data = this.data.filter((element) => !this.handleValueObject(identifier, value, element));
    }


    filter(query: (element: T) => boolean): InMemoryDataCollection<T> {
        const filteredView = this.data.filter(query);
        return new InMemoryDataCollection<T>(filteredView);
    }

    findMany<K extends keyof T>(identifier: K, value: T[K]): InMemoryDataCollection<T> {
        const filteredView = this.data.filter((element) => this.handleValueObject(identifier, value, element));
        return new InMemoryDataCollection<T>(filteredView);
    }

    findOne<K extends keyof T>(identifier: K, value: T[K]): T | undefined {
        return this.data.find((element) => this.handleValueObject(identifier, value, element));
    }

    exists<K extends keyof T>(identifier: K, value: T[K]): boolean {
        return this.data.some((element) => element[identifier] === value);
    }

    count(): number {
        return this.data.length;
    }

    paginate(page: number, pageSize: number): InMemoryDataCollection<T> {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedData = this.data.slice(start, end);
        return new InMemoryDataCollection<T>(paginatedData);
    }

    toArray(): T[] {
        return this.data;
    }

    upsert<K extends keyof T>(identifiers: K | K[], value: T[K] | T[K][], entity: T): void {
        const identifierArray = Array.isArray(identifiers) ? identifiers : [identifiers];
        const valueArray = Array.isArray(value) ? value : [value];
        const index = this.data.findIndex((element) => {
            return identifierArray.every((identifier, i) => this.handleValueObject(identifier, valueArray[i], element));
        });
        if (index > -1) {
            this.data[index] = entity;
        } else {
            this.data.push(entity);
        }
    }
}