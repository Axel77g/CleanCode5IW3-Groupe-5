

/*export class Result<T = string | null, E = Error | null  > {
    private readonly success: T | null;
    private readonly error: E | null;

    private constructor(success: T | null , error: E | null) {
        this.success = success;
        this.error = error;
    }

    static Success<T>(value: T): Result<T> {
        return new Result(value, null);
    }

    static SuccessVoid(): Result {
        return new Result(null, null);
    }

    static Failure<E extends Error>(error: E): Result<null, E> {
        return new Result(null, error);
    }

    static FailureStr(error: string): Result<null, Error> {
        return new Result(null, new Error(error));
    }

    unwrap(): T {
        if (this.success) {
            return this.success;
        }
        throw this.error;
    }

    isEmpty(): boolean {
        return this.error === null && this.success === null;
    }

    isFailure(): boolean {
        return this.error !== null;
    }

    isSuccess(): boolean {
        return this.success !== null;
    }

    getError(): E {
        if (this.error) {
            return this.error;
        }
        throw new Error("No error");
    }
}*/

export type ResultResponseMessage = string;

export type _VoidResult = {
    success: true;
}

type _PaginatedResult<T> = {
    value: T[];
    total: number;
    page: number;
    limit: number;
    success: true;
}

export type SuccessResult<T = ResultResponseMessage> = {
    success: true;
    value: T;
}

export type FailureResult = {
    success: false;
    error: Error;
}

export type Result<T = ResultResponseMessage> = SuccessResult<T> | FailureResult;
export type VoidResult = _VoidResult | FailureResult;
export type PaginatedResult<T> = _PaginatedResult<T> | FailureResult;
export const Result = {
    SuccessVoid(): _VoidResult {
        return { success: true };
    },
    Success<T = ResultResponseMessage>(value: T): SuccessResult<T> {
        return { success: true, value };
    },
    SuccessPaginated<T>(value: T[], total: number, page: number, limit: number): _PaginatedResult<T> {
        return { value, total, page, limit, success : true };
    },
    Failure(error: Error): FailureResult {
        return { success: false, error };
    },
    FailureStr(error: string): FailureResult {
        return { success: false, error: new Error(error) };
    },

}