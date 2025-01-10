export class ApplicationException extends Error{
    constructor(public identifier: string, public message: string){
        super(message);
    }

    static is(error : any) : error is ApplicationException {
        return error instanceof ApplicationException;
    }

    static equals(error1 : ApplicationException, error2 : ApplicationException) : boolean {
        return error1.identifier === error2.identifier;
    }
}