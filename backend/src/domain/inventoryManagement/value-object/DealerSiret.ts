export class DealerSiret{
    constructor(private siret: string){
        if(!this.isValid()){
            throw new Error("Invalid SIRET number");
        }
    }

    isValid(): boolean {
        const siretValidRegex = /^\d{14}$/;
        return siretValidRegex.test(this.siret);
    }
}