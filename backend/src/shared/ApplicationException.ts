export class ApplicationException extends Error{
    constructor(public identifier: string, public message: string){
        super(message);
    }
}