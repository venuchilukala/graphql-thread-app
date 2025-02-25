import { ApolloServer } from "@apollo/server";

import { User } from "./user";

async function createApolloGraphqlServer() {
    const gqlServer = new ApolloServer({
        // Schema
        typeDefs: `
            ${User.typeDefs}
            type Query{
                ${User.queries}
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