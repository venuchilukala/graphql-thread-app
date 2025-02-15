import express, { Express } from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'

async function init() {
    const app: Express = express()
    const PORT = Number(process.env.PORT) || 8000

    // Middleware 
    app.use(express.json())

    // Create Graphql Server 
    const gqlServer = new ApolloServer({
        // Schema
        typeDefs: `
            type Query{
                hello: String,
                say(name: String) : String
            }
        `,
        // Queries
        resolvers: {
            Query: {
                hello: () => `Hello there I am from graphql server`,
                say: (_, {name}: {name: String}) => `Hey ${name}, How are you?`
            }
        }
    })

    await gqlServer.start()

    app.get('/', (req, res) => {
        res.json({ messsage: 'server is up and running' })
    })

    app.use('/graphql', expressMiddleware(gqlServer) as any);

    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`)
    })
} init()

// we create function because we can't use await globally 