import express, { Express } from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import createApolloGraphqlServer from './graphql'

async function init() {
    const app: Express = express()
    const PORT = Number(process.env.PORT) || 8000

    // Middleware 
    app.use(express.json())

    // Routes
    app.get('/', (req, res) => {
        res.json({ messsage: 'server is up and running' })
    })

    // Graphql server imported and started using
    const gqlServer = await createApolloGraphqlServer()
    app.use('/graphql', expressMiddleware(gqlServer) as any);

    // Express server started
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`)
    })
} init()

// we create function because we can't use await globally 