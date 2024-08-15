export interface IResponse {
    isSuccess: boolean
}

export interface BaseErrorBody {
    code: string,
    message: string
}

export interface ISuccessResponse<T> extends IResponse {
    isSuccess: true,
    payload: T
}


export interface IErrorResponse<T extends BaseErrorBody> extends IResponse {
    isSuccess: false,
    error: T
}

export type TResponse<T, U extends BaseErrorBody> = ISuccessResponse<T> | IErrorResponse<U>