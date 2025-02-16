import UserService, { CreateUserPayload } from "../../services/userService";

const queries = {
    getUserToken: async(_:any, payload: {email: string, password: string}) =>{
        const token = UserService.getUserToken({
            email : payload.email,
            password : payload.password
        })

        return token;
    },
    getCurrentLogginUser: async(_:any, parameters: any, context: any)=>{
        console.log(context)
        if(context && context.user){
            const id = context.user.id 
            const user = await UserService.getUserById(id)
            return user;
        }

        throw new Error('Invalid Token or Invalid credentials')
    }
}

const mutations = {
    createUser: async(_: any, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload)
        return res.id;
    }
}

export const resolvers = {queries, mutations}