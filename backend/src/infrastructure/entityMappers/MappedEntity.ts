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