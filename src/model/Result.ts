export type Result<T> = {
    code: 'OK' | 'BAD_REQUEST' | 'INTERNAL_SERVER_ERROR',
    msg: string,
    data: T | void
}