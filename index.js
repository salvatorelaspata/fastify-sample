import { buildServer } from "./app"

buildServer().listen({ port: 3000, host: '0.0.0.0' })
    .then(() => {
        console.log('listen on 3000')
    })
    .catch((error) => {
        console.log(error)
    })
