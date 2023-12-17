import {Request, Response} from "express";
import * as OrderService from '../services/Order.service'

export const get = async (req: Request, res: Response) => {
    try {
        const orders = await OrderService.get()

        return res.send(orders)
    } catch (e) {
        return res.sendStatus(500)
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const order = await OrderService.getById({ id })

        return res.send(order)
    } catch (e) {
        return res.sendStatus(500)
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const { products } = req.body
        const { user_id } = res.locals
        const order = await OrderService.create({ user_id, products })

        return res.status(201).send(order)
    } catch (e) {
        return res.sendStatus(500)
    }
}

export const remove = async (req: Request, res: Response)    => {
    try {
        const { id } = req.params
        const order = await OrderService.remove({ id })

        if (order) {
            return res.sendStatus(200)
        }

        return res.sendStatus(404)
    } catch (e) {
        return res.sendStatus(500)
    }
}
