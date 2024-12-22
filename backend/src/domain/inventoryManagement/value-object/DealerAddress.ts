export class DealerAddress{
    constructor(
        public readonly street : string,
        public readonly city : string,
        public readonly postalCode : string,
        public readonly country : string
    ) {}
}