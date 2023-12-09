import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";

import Product from "./Product.model";

@Table({
    modelName: 'Description',
    tableName: 'Descriptions',
    timestamps: false
})
export default class Description extends Model {
    @Column({
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    })
    id: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    })
    text: string;

    @ForeignKey(() => Product)
    @Column
    product_id: number;

    @BelongsTo(() => Product, 'product_id')
    product: Product
}
