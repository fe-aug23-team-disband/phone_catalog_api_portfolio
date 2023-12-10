import {Table, Column, Model, BelongsTo, ForeignKey, HasOne} from 'sequelize-typescript';
import {DataTypes} from "sequelize";

import Product from "./Product.model";

@Table({
    modelName: 'Category',
    tableName: 'Categories',
    timestamps: false
})
export default class Category extends Model {
    @Column({
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    })
    id: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false
    })
    name: string;

    @HasOne(() => Product, 'category_id')
    product: Product
}
