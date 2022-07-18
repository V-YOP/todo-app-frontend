import axios, { AxiosError, AxiosPromise } from "axios"
import { Success, Fail, Result } from "../model/Result"
import { Task } from "../model/Task"

// const BASE_URL = 'http://127.0.0.1:1976'
const BASE_URL = 'https://service-k7zugq20-1259498433.gz.apigw.tencentcs.com/release'

const ALIVE_CHECK = `${BASE_URL}/alive`

const USER_BASE_URL = `${BASE_URL}/user`
const TASK_BASE_URL = `${BASE_URL}/task`

const USER_LOGIN = `${USER_BASE_URL}/login`
const USER_SIGNUP = `${USER_BASE_URL}/signup`
const USER_ISLOGIN = `${USER_BASE_URL}/isLogin`
const USER_STATUS = `${USER_BASE_URL}/status`
const USER_LOGOUT = `${USER_BASE_URL}/logout`

const TASK_GET = `${TASK_BASE_URL}/get`
const TASK_GET_ALL = `${TASK_GET}/all`
const TASK_GET_VALID = `${TASK_GET}/valid`
const TASK_GET_UNFINISHED = `${TASK_GET}/unfinished`
const TASK_GET_OUTDATED = `${TASK_GET}/outdated`
const TASK_ADD = `${TASK_BASE_URL}/add`
const TASK_DONE = `${TASK_BASE_URL}/done`
const TASK_DEL = `${TASK_BASE_URL}/del`

const axiosInstance = axios.create({
    withCredentials: true,
})

function toQueryParam(data: Array<[string, any]> | Record<string, any>): string {
    if (Array.isArray(data))
        return data.map(([k, v]) => `${encodeURI(k)}=${encodeURI(v as string)}`).join('&')
    return toQueryParam(Object.entries(data))
}

/**
 * 对error进行预先处理，如果是后端返回来的错误（此时状态码为40x或50x），则认为是正确返回，如果是其它错误（比如根本没打到后端），则认为是错误
 * @returns 
 */
function axiosErrorHandler<T>(){
    return (error: Error | AxiosError<T>) => {
        if (axios.isAxiosError(error)) {
            return error.response?.data as T
        }
        throw error // 未处理的内容
    }
 }

function checkIfAlive(): Promise<boolean> {
    return axiosInstance.get(ALIVE_CHECK)
        .catch(axiosErrorHandler<Result<number>>())
        .then(r => r.data.data as number === 42)
}

function login(
    userId: string,
    passwd: string,
    rememberMe: boolean = false) : Promise<Result<void>> {
    return axiosInstance.post<Result<void>>(USER_LOGIN, toQueryParam({userId,passwd,rememberMe}))
        .then(r => r.data)
        .catch(axiosErrorHandler<Result<void>>())
}

function signup(
    userId: string,
    passwd: string,
    userName: string) : Promise<Result<void>> {
    return axiosInstance.post<Result<void>>(USER_SIGNUP, toQueryParam({userId, passwd, userName})).then(r => r.data)
        .catch(axiosErrorHandler())
}

function isLogin() : Promise<Result<boolean>> {
    return axiosInstance.get<Result<boolean>>(USER_ISLOGIN)
        .then(r => r.data)
        .catch(axiosErrorHandler())
}

function status() : Promise<Result<Record<string, any>>> {
    return axiosInstance.get(USER_STATUS).then(r => r.data)
        .catch(axiosErrorHandler())
}

function logout() : Promise<Result<void>> {
    return axiosInstance.get(USER_LOGOUT).then(r => r.data)
        .catch(axiosErrorHandler())
}

function getTask(taskId: number): Promise<Result<Task>> {
    return axiosInstance.get(`${TASK_GET}?${toQueryParam({taskId})}`).then(r => r.data)
    .catch(axiosErrorHandler())
}

function getAllTask(): Promise<Result<Array<Task>>> {
    return axiosInstance.get(TASK_GET_ALL).then(r => r.data)
    .catch(axiosErrorHandler())
}

function getValidTask(): Promise<Result<Array<Task>>> {
    return axiosInstance.get(TASK_GET_VALID).then(r => r.data)
    .catch(axiosErrorHandler())
} 

function getUnfinishedTask(): Promise<Result<Array<Task>>> {
    return axiosInstance.get(TASK_GET_UNFINISHED).then(r => r.data)
    .catch(axiosErrorHandler())
} 

function getOutdatedTask(): Promise<Result<Array<Task>>> {
    return axiosInstance.get(TASK_GET_OUTDATED).then(r => r.data)
    .catch(axiosErrorHandler())
} 

function addTask(task: string): Promise<Result<number>> {
    return axiosInstance.post(TASK_ADD, [task]).then(r => r.data)
    .catch(axiosErrorHandler())
} 

function doneTask(taskId: number): Promise<Result<void>> {
    return axiosInstance.post(TASK_DONE, toQueryParam({taskId})).then(r => r.data)
    .catch(axiosErrorHandler())
} 

function delTask(taskId: number): Promise<Result<void>> {
    return axiosInstance.post(TASK_DEL, toQueryParam({taskId})).then(r => r.data)
    .catch(axiosErrorHandler())
} 

export const API = {
    login,
    signup,
    isLogin,
    status,
    logout,
    getTask,
    getAllTask,
    getValidTask,
    getUnfinishedTask,
    getOutdatedTask,
    addTask,
    doneTask,
    delTask
}
