import Product from "../models/Product.model";
import Category from "../models/Category.model";
import Description from "../models/Description.model";
import Image from "../models/Image.model";
import Color from "../models/Color.model";
import Discount from "../models/Discount.model";
import { Op, OrderItem } from "sequelize";

type QueryParams = {
    category: string
    limit?: number,
    offset?: number,
    filters?: {
        query?: string,
        byDate?: boolean,
        byDiscount?: boolean
    }
}

type WhereStatement = {
    [key: string]: {
        [Op.iLike]: string
    }
}

export const get = async ({ filters, limit = 10, offset = 0, category }: QueryParams) => {
    try {
        let whereStatement: WhereStatement = {}
        let OrderStatement: OrderItem[] = []

        if (filters?.query) {
            whereStatement.name = {
                [Op.iLike]: `%${filters.query}%`
            }
        }

        if (filters?.byDiscount) {
            OrderStatement.push([{ model: Discount, as: 'discount' }, 'value', "DESC"])
        }

        if (filters?.byDate) {
            OrderStatement.push(['time_created', "DESC"])
        }

        return Product.findAll({
            include: [
                {
                    model: Category,
                    attributes: ['name'],
                    where: {
                        name: category,
                    }
                },
                {
                    model: Image,
                    attributes: ['string'],
                    limit: 1,
                },
                {
                    model: Discount,
                    as: 'discount',
                    attributes: ['value'],
                }
            ],
            where: whereStatement,
            attributes: {
                exclude: ['category_id', 'discount_id']
            },
            limit,
            offset,
            order: OrderStatement
        })
    } catch (e) {
        return null
    }
}

export const getByNamespaceId = async ({ namespaceId }: { namespaceId: string }) => {
    try {
        return Product.findOne({
            include: [
                {
                    model: Image,
                    attributes: ['id', 'string']
                },
                {
                    model: Description,
                    attributes: { exclude: ['product_id'] }
                },
                {
                    model: Discount,
                    attributes: ['value'],
                },
                {
                    model: Color,
                    through: {
                        attributes: [],
                    }
                }
            ],
            where: { namespaceId },
            attributes: {
                exclude: ['category_id', 'discount_id']
            },
        })
    } catch (e) {
        return null
    }
}

export const getRecommended = async ({ basename, limit }: { basename: string, limit: number }) => {
    try {
        return Product.findAll({
            where: { basename },
            include: [
                {
                    model: Category,
                    attributes: ['name'],
                },
                {
                    model: Image,
                    attributes: ['string'],
                    limit: 1,
                },
                {
                    model: Discount,
                    as: 'discount',
                    attributes: ['value'],
                }
            ],
            attributes: {
                exclude: ['category_id', 'discount_id']
            },
            limit,
        })
    } catch (e) {
        return null
    }
}
