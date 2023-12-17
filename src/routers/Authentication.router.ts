import express from "express";
import * as AuthController from "../controllers/Authentication.controller"

const router = express.Router();

router.use(express.json());

router.post('/login', AuthController.login);

router.delete('/logout', AuthController.logout);

router.post('/refresh', AuthController.refresh);

export default router
