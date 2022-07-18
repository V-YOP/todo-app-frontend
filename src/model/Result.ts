
export type Result<T> = Success<T> | Fail<T>
export type Success<T> = {
    code: 'OK',
    msg: string,
    data: T 
}
export type Fail<T> = {
    code: 'BAD_REQUEST' | 'INTERNAL_SERVER_ERROR' | 'NOT_LOGIN',
    msg: string,
    data: T 
}

export function isSuccess<T>(result: Result<T>) : result is Success<T> {
    return result.code === 'OK'
}

export function isFail<T>(result: Result<T>) : result is Fail<T> {
    return !isSuccess(result)
}
