export class Immatriculation{
    constructor(private immatriculation: string) {
        if (!this.isValid()) {
            throw new Error('Invalid immatriculation');
        }
    }

    private isValid(): boolean {
        const immatriculationValidRegex = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/;
        return immatriculationValidRegex.test(this.immatriculation);
    }

    getValue(): string {
        return this.immatriculation;
    }
}