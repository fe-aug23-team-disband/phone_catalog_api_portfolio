import Product from "../models/Product.model";
import Category from "../models/Category.model";
import Description from "../models/Description.model";
import Image from "../models/Image.model";
import Color from "../models/Color.model";
import Discount from "../models/Discount.model";
import {Op} from "sequelize";

type QueryParams = {
    category: string
    query?: string,
    limit?: number,
    offset?: number,
}

type WhereStatement = {
    [key: string]: {
        [Op.like]: string
    }
}

export const get = async ({ query = '', limit = 10, offset = 0, category }: QueryParams) => {
    try {
        let whereStatement: WhereStatement = {}

        if (query) {
            whereStatement.name = {
                [Op.like]: `%${query}%`
            }
        }

        const products = await Product.findAll({
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
                    attributes: ['value'],
                }
            ],
            where: whereStatement,
            attributes: {
                exclude: ['category_id', 'discount_id']
            },
            limit,
            offset,
            order: [
                ["id", 'DESC']
            ],
        })

        return products
    } catch (e) {
        return null
    }
}

export const getByNamespaceId = async ({ namespaceId }: { namespaceId: string }) => {
    try {
        const product = await Product.findOne({
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
                    model: Color
                }
            ],
            where: { namespaceId },
            attributes: {
                exclude: ['category_id', 'discount_id']
            },
        })

        return product
    } catch (e) {
        return null
    }
}
