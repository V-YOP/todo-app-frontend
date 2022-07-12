export type Result<T> = {
    code: 'OK',
    msg: string,
    data: T | void
}
export type BadResult<T> = {
    code: 'BAD_REQUEST' | 'INTERNAL_SERVER_ERROR' | 'NOT_LOGIN',
    msg: string,
    data?: T | void
}

export function isSuccess<T>(result: Result<T> | BadResult<T>) : result is Result<T> {
    return result.code === 'OK'
}

export function isFail<T>(result: Result<T> | BadResult<T>) : result is BadResult<T> {
    return !isSuccess(result)
}