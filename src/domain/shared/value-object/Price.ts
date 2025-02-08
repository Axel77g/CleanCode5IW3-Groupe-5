import {ApplicationException} from "@shared/ApplicationException";

export enum Currency {
    EUR = "€",
}

export class Price{
    static errors = {
        PRICE_NOT_VALID: new ApplicationException("price.notValid","The price is not valid")
    }
    private constructor(private value: number, private currency : Currency) {}



    isValid(): boolean {
        return this.value >= 0;
    }

    getValue(): number {
        return this.value;
    }

    getFormattedValue(): string {
        return this.value.toFixed(2) + this.currency;
    }

    static create(price : number){
        const priceObject = new Price(price, Currency.EUR);
        if(priceObject.isValid()){
            return priceObject;
        }
        return Price.errors.PRICE_NOT_VALID;
    }
}