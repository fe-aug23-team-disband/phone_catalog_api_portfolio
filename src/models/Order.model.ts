import {BelongsTo, BelongsToMany, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";

import Product from "./Product.model";
import User from "./User.model";
import Product_Order from "./Product_Order.model";

@Table({
    modelName: 'Order',
    tableName: 'Orders',
    timestamps: false
})
export default class Order extends Model {
    @Column({
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    })
    id: string;

    @ForeignKey(() => User)
    @Column
    owner_id: number;

    @BelongsTo(() => User, 'owner_id')
    user: User

    @BelongsToMany(() => Product, () => Product_Order)
    products: Product[]
}
