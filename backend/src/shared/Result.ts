import {ApplicationException} from "@shared/ApplicationException";

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

export type EmptyResult = {
    success: true;
    value: null;
}

export type FailureResult = {
    success: false;
    error: ApplicationException;
}

export type Result<T = ResultResponseMessage> = SuccessResult<T> | FailureResult;
export type OptionalResult<T = ResultResponseMessage> = SuccessResult<T> | EmptyResult | FailureResult;
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
    SuccessEmpty(): EmptyResult {
        return { success: true, value: null };
    },
    Failure(error: ApplicationException): FailureResult {
        return { success: false, error };
    },
    FailureStr(error: string): FailureResult {
        return { success: false, error: new ApplicationException('generic', error) };
    },

}