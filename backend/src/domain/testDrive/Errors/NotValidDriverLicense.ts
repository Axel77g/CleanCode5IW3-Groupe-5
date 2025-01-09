export class NotValidDriverLicense extends Error {
    constructor() {
        super("Driver license is not valid");
    }
}