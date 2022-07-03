import { API } from "./API/API";

// node --experimental-specifier-resolution=node --loader ts-node/esm src/CLI.ts

async function main() {
    const res = await API.login('yuuki', '123456')
    // console.log(res.headers)
    const data = await API.addTask('x hello, world!')
    console.log(data.data)
    const task = await API.getTask(data.data.data as number)
    console.log(task)
}

main().catch(e => {console.log(e)})