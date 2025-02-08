export class MappedEntity<T>{
    constructor(entity: T){
        Object.assign(this, entity);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    public only(properties: (keyof T)[]): Pick<MappedEntity<T>, keyof T & string> {
        const newMappedEntity = new (this.constructor as {

            new(data: Pick<T, keyof T>): MappedEntity<T>
        })({} as Pick<T, keyof T>);
        properties.forEach(property => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            newMappedEntity.data[property] = this.data[property];
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return newMappedEntity as Pick<MappedEntity<T>, keyof T & string>;
    }

    public except(properties: (keyof T)[]): Omit<MappedEntity<T>, keyof T & string> {
        const newMappedEntity = new (this.constructor as {
            new(data: Omit<T, keyof T>): MappedEntity<T>
        })({} as Omit<T, keyof T>);
        Object.keys(this).forEach((property) => {
            if(!properties.includes(property as keyof T)){
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                newMappedEntity[property] = this[property];
            }
        });
        return newMappedEntity as Omit<MappedEntity<T>, keyof T & string>;
    }
}

export class MappedEntities<T> extends Array{
    constructor(entities: MappedEntity<T>[]){
        super();
        this.concat(entities);
    }

    public only(properties: (keyof T)[]){
        const newMappedEntities = new MappedEntities([]);
        this.forEach((mappedEntity: MappedEntity<T>) => {
            newMappedEntities.push(mappedEntity.only(properties));
        });
        return newMappedEntities;
    }

    public except(properties: (keyof T)[]){
        const newMappedEntities = new MappedEntities([]);
        this.forEach((mappedEntity: MappedEntity<T>) => {
            newMappedEntities.push(mappedEntity.except(properties));
        });
        return newMappedEntities;
    }
}