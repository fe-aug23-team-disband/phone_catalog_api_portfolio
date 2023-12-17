import {Request, Response} from "express";
import * as AuthService from "../services/Authentication.service"

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const verifiedUser = await AuthService.verifyUser({ email, password })

        if (verifiedUser) {
            const session = await AuthService.login({ user_id: verifiedUser.id })

            if (session) {
                res.cookie("session_token", session.session_token)
                res.cookie("refresh_token", session.refresh_token)

                return res.status(201).send({
                    time_expired: session.time_expired
                })
            }
        }

        return res.sendStatus(404)
    } catch (e) {
        return res.sendStatus(500)
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const session_token = req.cookies.session_token

        if (session_token) {
            const deleted = await AuthService.logout({ session_token })

            if (deleted) {
                res.clearCookie("session_token")
                res.clearCookie("refresh_token")

                return res.send({ deleted })
            }

            return res.sendStatus(403)
        }
    } catch (e) {
        return res.sendStatus(500)
    }
}
export const refresh = async (req: Request, res: Response) => {
    try {
        const refresh_token = req.cookies.refresh_token
        const newSession = await AuthService.refresh({ refresh_token })

        if (newSession) {
            res.cookie("session_token", newSession.session_token)
            res.cookie("refresh_token", newSession.refresh_token)

            return res.status(201).send({
                time_expired: newSession.time_expired
            })
        }

        return res.sendStatus(404)
    } catch (e) {
        return res.sendStatus(500)
    }
}
