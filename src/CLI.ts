import { API } from "./API/API";
import { Task, taskToString } from "./model/Task";

const VALID_COMMAND = ['ls', 'list', 'add', 'del', 'done', 'help']

// 
const [,,cmd, ...args] = process.argv
if (VALID_COMMAND.indexOf(cmd) < 0){
    throw new Error('invalid command')
}

function ls(): Promise<Task[]> {
    return API.getAllTask().then(res => res.data.data as Task[]) 
}
function add(taskStr: string): Promise<number> {
    return API.addTask(taskStr).then(res => res.data.data as number)
}
function del(taskId: number): Promise<void> {
    return API.delTask(taskId).then(res => undefined)
}
function done(taskId: number): Promise<void> {
    return API.doneTask(taskId).then(res => undefined)
}

async function main() {
    await API.login('yuuki', '123456')
    switch (cmd) {
        case 'ls':
        case 'list':
            const tasks = await ls()
            console.log(tasks.map(taskToString).join('\n'))
            break;
        case 'add':
            const id = await add(args.join(' '))
            console.log(id)
            break;
        case 'del':
            await del(parseInt(args[0]))
            break;
        case 'done':
            await done(parseInt(args[0]))
            break;
        default:
            throw new Error('impossible')
    }
}

main().catch(e => {console.log(e)})