import { createHmac, randomBytes } from 'node:crypto'
import JWT from 'jsonwebtoken'

import { prismaClient } from "../lib/db"

const JWT_SECRET = 'Venu_m'

export interface CreateUserPayload {
    firstName: string,
    lastName?: string,
    email: string,
    password: string,
}

export interface GetUserTokenPayload {
    email: string,
    password: string,

}

class UserService {
    private static generateHash(salt: string, password: string) {
        const hashedPassword = createHmac('sha256', salt).update(password).digest('hex')
        return hashedPassword
    }

    public static async createUser(payload: CreateUserPayload) {
        try {
            const { firstName, lastName, email, password } = payload;

            const salt = randomBytes(32).toString('hex');
            const hashedPassword = UserService.generateHash(salt, password);

            const user = await prismaClient.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    salt,
                    password: hashedPassword
                }
            });

            return user;
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
        }
    }

    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({ where: { email } })
    }

    public static async getUserToken(payload: GetUserTokenPayload) {
        const { email, password } = payload;
        const user = await UserService.getUserByEmail(email)
        if (!user) throw new Error('user not found')

        const userSalt = user.salt
        const userHashedPassword = UserService.generateHash(userSalt, password)

        if (userHashedPassword !== user.password) throw new Error('Incorrect Password')

        // Generate jsonwebtoken 
        const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET)
        return token
    }
}

export default UserService