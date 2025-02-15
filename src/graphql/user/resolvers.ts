const queries = {}

const mutations = {
    createUser: async(_: any, {}:{}) => {
        return "User creat is working fine";
    }
}

export const resolvers = {queries, mutations}