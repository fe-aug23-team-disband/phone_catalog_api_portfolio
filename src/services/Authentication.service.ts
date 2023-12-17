import Session from "../models/Session.model";
import {randomUUID} from "node:crypto";
import User from "../models/User.model";
import {md5} from "js-md5";

export const login  = async ({ user_id }: { user_id: string }) => {
    try {
        const session = await Session.findOne({
            include: [{ model: User, where: { id: user_id } }]
        })

        if (!session) {
            const refresh_token = randomUUID()

            return Session.create({
                user_id,
                refresh_token,
                time_created: new Date()
            })
        }

        return session
    } catch (e) {
        return Promise.reject("Server error")
    }
}

export const logout  = async ({ session_token }: { session_token: string }) => {
    try {
        const session = await Session.findOne({ where: { session_token } })

        if (session) {
            await session.destroy()
            return 1
        }

        return 0
    } catch (e) {
        console.log(e)
        return Promise.reject("Server error")
    }
}

export const refresh  = async ({ refresh_token }: { refresh_token: string }) => {
    try {
        const session = await Session.findOne({ where: { refresh_token }})

        if (session) {
            const newRefresh = randomUUID()

            return session.update({
                refresh_token: newRefresh,
                time_created: new Date()
            })
        }

        return 0
    } catch (e) {
        return Promise.reject("Server error")
    }
}

export const verifyUser  = async ({ email, password }: { email: string, password: string }) => {
    try {
        const user = await User.findOne({ where: { email } })

        if (user && md5(password + user.salt) === user.password) {
            return user
        }

        return 0
    } catch (e) {
        return Promise.reject('Server error')
    }
}

export const verifySession = async ({ session_token }: { session_token: string }) => {
    try {
        const session = await Session.findOne({ where: { session_token }})

        if (session) {
            return new Date().getTime() - session.time_expired <= 0
        }

        return false
    } catch (e) {
        return Promise.reject('Server error')
    }
}

export const findUser = async ({ session_token }: { session_token: string }) => {
    try {
        const user = await User.findOne({
            include: [{
                model: Session,
                where: { session_token }
            }],
            attributes: ['id']
        })

        if (user) {
            return user
        }

        return 0
    } catch (e) {
        return Promise.reject('Server error')
    }
}
