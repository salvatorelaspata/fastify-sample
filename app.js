import fastify from "fastify";
import { Readable } from "node:stream";
import { setTimeout } from "node:timers/promises";

export const buildServer = function () {
    const server = fastify();
    server.get('/hello',
        async () => ({ hello: "world" }))
    async function* render() {
        yield '<h1>Hello world!</h1>'
        await setTimeout(1000)
        yield '<p>1 second passed</p>'
        await setTimeout(1000)
        yield '<p>2 second passed</p>'
        await setTimeout(1000)
        yield '<p>3 second passed</p>'
        await setTimeout(3000)
        yield '<p>6 second passed</p>'
    }

    server.get('/', (req, res) => {
        const readable = Readable.from(render())
        res.type('text/html')
        res.send(readable)
    })
    return server
}