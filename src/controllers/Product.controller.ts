import { Request, Response } from "express"
import * as ProductService from '../services/Product.service'

const SortFields: { [key: string]: string } = {
    "time": "time_created",
    "price": 'priceRegular',
    'name': "name",
}

export const get = async (req: Request, res: Response) => {
    try {
        const {
            category = req.baseUrl.slice(1),
            query = '',
            page = 0,
            limit = 10,
            sortBy,
            desc = false
        } = req.query
        const offset = Math.ceil(+page * +limit)
        const sort: { field?: string, isDESC?: boolean } = {}

        if (!category) {
            return res.sendStatus(400)
        }

        if (sortBy) {
            sort.field = SortFields[sortBy.toString()]
            sort.isDESC = (desc === 'true')
        }

        const products = await ProductService.get({
            category: category.toString(),
            limit: +limit,
            offset,
            sort,
            filters: {
                query: query.toString()
            }
        })

        if (products) {
            const paginationNav = {
                nextPage: Math.floor(offset/+limit) + 1,
                prevPage: Math.floor(offset/+limit) - 1 >= 0 ? Math.floor(offset/+limit) - 1 : null
            }
            const resBody: { [key: string]: any } = {
                total: products.count,
                onPage: products.rows.length,
                nextPage: null,
                prevPage: null,
                data: products.rows,
            }

            if (products.rows.length >= +limit) {
                const nextSearchParams = new URLSearchParams()

                nextSearchParams.append('limit', limit.toString())
                nextSearchParams.append('page', paginationNav.nextPage.toString())
                if (query) {
                    nextSearchParams.append('query', query.toString())
                }

                resBody.nextPage = `/${category}?${nextSearchParams.toString()}`
            }

            if (paginationNav.prevPage !== null) {
                const prevSearchParams = new URLSearchParams()

                prevSearchParams.append('limit', limit.toString())
                if (paginationNav.prevPage > 0) {
                    prevSearchParams.append('page', paginationNav.prevPage.toString())
                }
                if (query) {
                    prevSearchParams.append('query', query.toString())
                }

                resBody.prevPage  = `/${category}?${prevSearchParams.toString()}`
            }

            return res.send(resBody)
        }
    }
    catch (e) {
        return res.sendStatus(500)
    }
}

export const getByNamespaceId = async (req: Request, res: Response) => {
    try {
        const { namespaceId } = req.params
        const product = await ProductService.getByNamespaceId({ namespaceId })

        if (product) {
            return res.send(product)
        }

        return res.sendStatus(404)
    } catch (e) {
        return res.sendStatus(500)
    }
}

export const getSpecials = (specialsType: 'latest' | 'discount') => {
    return async (req: Request, res: Response) => {
        try {
            const filter: { byDiscount?: boolean, byDate?: boolean } = {}
            const {
                category,
                limit = 10
            } = req.query

            if (!category) {
                return res.sendStatus(400)
            }

            switch (specialsType) {
                case "discount":
                    filter.byDiscount = true
                    break
                case "latest":
                    filter.byDate = true
            }

            const products = await ProductService.get({
                category: category.toString(),
                limit: +limit,
                filters: filter
            })

            return res.send(products)
        } catch (e) {
            return res.sendStatus(500)
        }
    }
}

export const getRecommended = async (req: Request, res: Response) => {
    try {
        const { namespaceId } = req.params
        const { limit = 10 } = req.query
        const product = await ProductService.getByNamespaceId({ namespaceId })

        if (product) {
            const recommended = await ProductService.getRecommended({
                basename: product.basename,
                limit: +limit
            })

            return res.send(recommended)
        }

        return res.sendStatus(404)
    } catch (e) {
        return res.sendStatus(500)
    }
}
