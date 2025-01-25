import {ApplicationException} from "@shared/ApplicationException";

export type ResultResponseMessage = string;

export type _VoidResult = {
    success: true;
    empty: true;
    value: null;
}

type _PaginatedResult<T> = {
    success: true;
    empty: false;
    value: T[];
    total: number;
    page: number;
    limit: number;
}

export type SuccessResult<T = ResultResponseMessage> = {
    success: true;
    empty: false;
    value: T;
}

export type FailureResult = {
    success: false;
    empty: false;
    error: ApplicationException;
}

export type Result<T = ResultResponseMessage> = SuccessResult<T> | FailureResult;
export type OptionalResult<T = ResultResponseMessage> = SuccessResult<T> | _VoidResult | FailureResult;
export type VoidResult = _VoidResult | FailureResult;
export type PaginatedResult<T> = _PaginatedResult<T> | FailureResult;
export const Result = {
    SuccessVoid(): _VoidResult {
        return { success: true, empty: true, value: null };
    },
    Success<T = ResultResponseMessage>(value: T): SuccessResult<T> {
        return { success: true, value, empty: false };
    },
    SuccessPaginated<T>(value: T[], total: number, page: number, limit: number): _PaginatedResult<T> {
        return { value, total, page, limit, success : true, empty: false };
    },
    Failure(error: ApplicationException): FailureResult {
        return { success: false, error, empty: false };
    },
    FailureStr(error: string): FailureResult {
        return { success: false, error: new ApplicationException('generic', error), empty: false };
    },
}