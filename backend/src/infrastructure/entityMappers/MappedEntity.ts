export class MappedEntity{
    [key: string]: any;
    constructor(entity: Record<string, any>){
        Object.assign(this, entity);
    }

    public only(properties: string[]){
        let newMappedEntity = new MappedEntity({});
        properties.forEach((property) => {
            newMappedEntity[property] = this[property];
        });
        return newMappedEntity;
    }

    public except(properties: string[]) : MappedEntity {
        let newMappedEntity = new MappedEntity({});
        Object.keys(this).forEach((property) => {
            if(!properties.includes(property)){
                newMappedEntity[property] = this[property];
            }
        });
        return newMappedEntity
    }
}

export class MappedEntities extends Array{
    constructor(entities: MappedEntity[]){
        super();
        this.concat(entities);
    }

    public only(properties: string[]){
        let newMappedEntities = new MappedEntities([]);
        this.forEach((mappedEntity: MappedEntity) => {
            newMappedEntities.push(mappedEntity.only(properties));
        });
        return newMappedEntities;
    }

    public except(properties: string[]){
        let newMappedEntities = new MappedEntities([]);
        this.forEach((mappedEntity: MappedEntity) => {
            newMappedEntities.push(mappedEntity.except(properties));
        });
        return newMappedEntities;
    }
}