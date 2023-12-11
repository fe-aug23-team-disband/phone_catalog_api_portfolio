import { Request, Response } from "express"
import * as ProductService from '../services/Product.service'

export const get = async (req: Request, res: Response) => {
    const {
        category,
        query = '',
        page = 0,
        limit = 10
    } = req.query
    const offset = Math.ceil(+page * +limit)

    if (!category) {
        return res.sendStatus(400)
    }

    const products = await ProductService.get({
        category: category.toString(),
        limit: +limit,
        offset,
        filters: {
            query: query.toString()
        }
    })

    if (products) {
        const paginationNav = {
            limit,
            nextPage: Math.floor(offset/+limit) + 1,
            prevPage: Math.floor(offset/+limit) - 1 >= 0 ? Math.floor(offset/+limit) - 1 : null
        }
        const resBody: { [key: string]: any } = {
            count: products.length,
            nextPage: null,
            prevPage: null,
            data: products,
        }

        if (products.length >= +limit) {
            const nextSearchParams = new URLSearchParams()

            nextSearchParams.append('category', category.toString())
            nextSearchParams.append('limit', limit.toString())
            nextSearchParams.append('page', paginationNav.nextPage.toString())
            if (query) {
                nextSearchParams.append('query', query.toString())
            }

            resBody.nextPage = `/products?${nextSearchParams.toString()}`
        }

        if (paginationNav.prevPage !== null) {
            const prevSearchParams = new URLSearchParams()

            prevSearchParams.append('category', category.toString())
            prevSearchParams.append('limit', limit.toString())
            if (paginationNav.prevPage > 0) {
                prevSearchParams.append('page', paginationNav.prevPage.toString())
            }
            if (query) {
                prevSearchParams.append('query', query.toString())
            }

            resBody.prevPage  = `/products?${prevSearchParams.toString()}`
        }

        return res.send(resBody)
    }

    return res.sendStatus(500)
}

export const getByNamespaceId = async (req: Request, res: Response) => {
    const { namespaceId } = req.params

    if (namespaceId) {
        const products = await ProductService.getByNamespaceId({ namespaceId })

        if (products) {
            return res.send(products)
        }

        return res.sendStatus(500)
    }

    return res.sendStatus(400)
}

export const getLatest = async (req: Request, res: Response) => {}

export const getHotPrice = async (req: Request, res: Response) => {
    const {
        category,
        limit = 10
    } = req.query

    if (!category) {
        return res.sendStatus(400)
    }

    const products = await ProductService.get({
        category: category.toString(),
        limit: +limit,
        filters: {
            byDiscount: true
        }
    })

    return res.send(products)
}
