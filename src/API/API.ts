import axios, { AxiosPromise } from "axios"
import { Result } from "../model/Result"
import { Task } from "../model/Task"

// const BASE_URL = 'http://127.0.0.1:1976'
const BASE_URL = 'https://service-k7zugq20-1259498433.gz.apigw.tencentcs.com/release'

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

type APIResponse<T> = AxiosPromise<Result<T>>

function login(
    userId: string,
    passwd: string,
    rememberMe: boolean = false) : APIResponse<void> {
    return axiosInstance.post(USER_LOGIN, toQueryParam({userId,passwd,rememberMe})).then(response => {
        const cookie = (response.headers["set-cookie"] as string[])
                            .map(str=>str.split(';',1)[0])
                            .join(';')

        // node环境下好像得手动设置cookie？
        axiosInstance.defaults.headers.get = {
            ...axiosInstance.defaults.headers.get,
            Cookie:cookie
        }
        axiosInstance.defaults.headers.post = {
            ...axiosInstance.defaults.headers.post,
            Cookie:cookie
        }
        return response
    })
}

function signup(
    userId: string,
    passwd: string,
    userName: string) : APIResponse<void> {
    return axiosInstance.post(USER_SIGNUP, toQueryParam({userId, passwd, userName}))
}

function isLogin() : Promise<boolean> {
    return axiosInstance.get(USER_ISLOGIN)
}

// TODO 为此定义对应的结果类型？
function status() : APIResponse<Record<string, any>> {
    return axiosInstance.get(USER_STATUS)
}

function logout() : APIResponse<void> {
    return axiosInstance.get(USER_LOGOUT)
}

function getTask(taskId: number): APIResponse<Task> {
    return axiosInstance.get(`${TASK_GET}?${toQueryParam({taskId})}`)
}

function getAllTask(): APIResponse<Array<Task>> {
    return axiosInstance.get(TASK_GET_ALL)
}

function getValidTask(): APIResponse<Array<Task>> {
    return axiosInstance.get(TASK_GET_VALID)    
} 

function getUnfinishedTask(): APIResponse<Array<Task>> {
    return axiosInstance.get(TASK_GET_UNFINISHED)    
} 

function getOutdatedTask(): APIResponse<Array<Task>> {
    return axiosInstance.get(TASK_GET_OUTDATED)    
} 

function addTask(task: string): APIResponse<number> {
    return axiosInstance.post(TASK_ADD, [task])    
} 

function doneTask(taskId: number): APIResponse<void> {
    return axiosInstance.post(TASK_DONE, toQueryParam({taskId}))    
} 

function delTask(taskId: number): APIResponse<void> {
    return axiosInstance.post(TASK_DEL, toQueryParam({taskId}))    
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
