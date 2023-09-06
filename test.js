import { test } from 'tap'
import { buildServer } from './app.js'


test('GET `/hello` route', t => {
    t.plan(4)
    const fastify = buildServer()
    t.teardown(() => fastify.close())
    fastify.inject({
        method: 'GET',
        path: '/hello'
    }, (err, response) => {
        t.error(err)
        t.equal(response.statusCode, 200)
        t.equal(response.headers['content-type'], 'application/json; charset=utf-8')
        t.same(JSON.parse(response.payload), { hello: "world" })
    })
})

test('GET `/` route', t => {
    t.plan(4)
    const fastify = buildServer()
    t.teardown(() => fastify.close())
    fastify.inject({
        method: 'GET',
        path: '/'
    }, (err, response) => {
        t.error(err)
        t.equal(response.statusCode, 200)
        t.equal(response.headers['content-type'], 'text/html')
        t.same(response.payload, '<h1>Hello world!</h1><p>1 second passed</p><p>2 second passed</p><p>3 second passed</p><p>6 second passed</p>')
    })
})