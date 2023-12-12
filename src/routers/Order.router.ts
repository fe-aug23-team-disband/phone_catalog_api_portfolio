import express from "express";
import { get, getById, create, remove } from "../controllers/Order.controller";

const router = express.Router();

router.use(express.json());

router.get('/', get);

router.get('/:id', getById);

router.delete('/:id', remove);

router.post('/', create);

export default router
