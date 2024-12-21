import {CurrencyEnum} from "../enum/CurrencyEnum";

export class Price{
    constructor(
        private readonly price: number,
        private readonly currency: CurrencyEnum = CurrencyEnum.EUR
    ) {
        if (!this.isValid()) {
            throw new Error('Invalid price');
        }
    }

    private isValid(): boolean {
        return this.price >= 0;
    }

    getValue(): number {
        return this.price;
    }

    setValue(price: number): Price {
        return new Price(price, this.currency);
    }

    getCurrency(): CurrencyEnum {
        return this.currency;
    }

    setCurrency(currency: CurrencyEnum): Price {
        return new Price(this.price, currency);
    }

    getFormattedValue(): string {
        return `${this.price} ${this.currency}`;
    }

}