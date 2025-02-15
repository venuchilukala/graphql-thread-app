import { ApolloServer } from "@apollo/server";

import { User } from "./user";

async function createApolloGraphqlServer() {
    const gqlServer = new ApolloServer({
        // Schema
        typeDefs: `
            type Query{
                hello: String
            }
            
            type Mutation {
                ${User.mutations}
            }
        `,
        // Queries
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations
            }
        }
    })

    await gqlServer.start();

    return gqlServer;
}

export default createApolloGraphqlServer;