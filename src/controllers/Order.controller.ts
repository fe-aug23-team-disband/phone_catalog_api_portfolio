import {Request, Response} from "express";
import * as OrderService from '../services/Order.service'

export const get = async (req: Request, res: Response) => {
    const orders = await OrderService.get()

    if (orders) {
        return res.send(orders)
    }

    return res.sendStatus(500)
}

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params
    const order = await OrderService.getById({ id })

    if (order) {
        return res.send(order)
    }

    return res.sendStatus(500)
}

export const create = async (req: Request, res: Response) => {
    const { user_id, products } = req.body
    const order = await OrderService.create({ user_id, products })

    if (order) {
        return res.status(201).send(order)
    }

    return res.sendStatus(500)
}

export const remove = async (req: Request, res: Response)    => {
    const { id } = req.params
    const order = await OrderService.remove({ id })

    if (order === null) {
        return res.sendStatus(500)
    }

    if (order) {
        return res.sendStatus(200)
    }

    return res.sendStatus(404)
}
