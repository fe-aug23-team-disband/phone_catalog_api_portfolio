import { Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import Product from "./Product.model";
import Order from "./Order.model";

@Table({
    modelName: 'Product_Order',
    tableName: 'Product_Order',
    timestamps: false
})
export default class Product_Order extends Model {
    @ForeignKey(() => Product)
    @Column(DataTypes.UUID)
    product_id: number;

    @ForeignKey(() => Order)
    @Column(DataTypes.UUID)
    order_id: number;

    @Column
    count: number
}
