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

    equals(error : ApplicationException) : boolean {
        return this.identifier === error.identifier;
    }

}

export class NotFoundEntityException extends ApplicationException {
    private constructor(message: string){
        super('NOT_FOUND_ENTITY', message);
    }

    static create(message: string) : NotFoundEntityException {
        return new NotFoundEntityException(message);
    }
}

export class InternalException extends ApplicationException {
    private detailedMessage: string;
    private constructor(message: string){
        super('INTERNAL_ERROR', "An internal error occurred");
        this.detailedMessage = message;
    }

    static create(message: string) : InternalException {
        return new InternalException(message);
    }
}