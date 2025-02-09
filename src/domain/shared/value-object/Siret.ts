import {ApplicationException} from "@shared/ApplicationException";

export class Siret {
    static errors = {
        SIRET_NOT_VALID: new ApplicationException("Siret.NotValid", "The siret is not valid format")
    }
    private constructor(private value: string) {}

    isValid(): boolean {
        const siretValidRegex = /^\d{14}$/;
        return siretValidRegex.test(this.value);
    }

    getValue(): string {
        return this.value;
    }

    static create(siret : string){
        const siretObject = new Siret(siret);
        if(siretObject.isValid()){
            return siretObject;
        }
        return Siret.errors.SIRET_NOT_VALID;
    }
}