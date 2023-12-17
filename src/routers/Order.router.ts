import express from "express";
import { get, getById, create, remove } from "../controllers/Order.controller";
import * as AuthService from "../services/Authentication.service"

const router = express.Router();

router.use(express.json());
router.use(async (req, res, next) => {
    const session_token = req.cookies.session_token

    if (session_token) {
        const isValid = await AuthService.verifySession({ session_token })

        if (isValid) {
            const user = await AuthService.findUser({ session_token })

            if (user) {
                res.locals.user_id = user.id
                return next()
            }
        }

        return res.sendStatus(401)
    }

    res.sendStatus(401)
})

router.get('/', get);

router.get('/:id', getById);

router.delete('/:id', remove);

router.post('/', create);

export default router
