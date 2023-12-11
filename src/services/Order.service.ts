import Order from "../models/Order.model";
import User from "../models/User.model";
import Product from "../models/Product.model";
import Discount from "../models/Discount.model";
import Product_Order from "../models/Product_Order.model";
import sequelize from "../database/db";

export const get = async () => {
    try {
        return Order.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'email']
                },
                {
                    model: Product,
                    include: [{ model: Discount, attributes: ['value'] }],
                    attributes: ['name', 'priceRegular', 'priceDiscount'],
                    through: {
                        attributes: ['count']
                    }
                }
            ],
            attributes: { exclude: ['owner_id'] }
        })
    } catch (e) {
        return null
    }
}

export const getById = async ({ id }: { id: string }) => {
    try {
        const order = await Order.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    attributes: ['name', 'email']
                },
                {
                    model: Product,
                    include: [{ model: Discount, attributes: ['value'] }],
                    attributes: ['name', 'priceRegular', 'priceDiscount'],
                    through: {
                        attributes: ['count']
                    }
                }
            ],
            attributes: { exclude: ['owner_id'] }
        })

        return order
    } catch (e) {
        return null
    }
}

export const create = async ({ user_id, products }: { user_id: string, products: [string, number][] }) => {
    const t = await sequelize.transaction();

    try {
        const order = await Order.create({
            owner_id: user_id
        }, { transaction: t })

        await Product_Order.bulkCreate(products.map(([product_id, count]) => {
            console.log(product_id, count)
            return {
                order_id: order.id,
                product_id,
                count,
            }
        }),{ transaction: t })

        await t.commit()
        return order
    } catch (e) {
        await t.rollback()
        return null;
    }
}

export const remove = async ({ id }: { id: string }) => {
    try {
        await Product_Order.destroy({
            where: {
                order_id: id
            }
        })

        return Order.destroy({
            where: { id }
        })
    } catch (e) {
        return null
    }
}
