export class ApplicationException extends Error{
    constructor(public identifier: string, public message: string){
        super(message);
    }

    static is(error : any) : error is ApplicationException {
        return error instanceof ApplicationException;
    }


    is(identifier : string) : boolean {
        return this.identifier === identifier;
    }
}