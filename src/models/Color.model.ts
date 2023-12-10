import {Table, Column, Model, Is, BelongsTo, BelongsToMany, ForeignKey, HasOne} from 'sequelize-typescript';
import {DataTypes} from "sequelize";

import Product from "./Product.model";
import Product_Color from "./Product_Color.model";

const HEX_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

@Table({
    modelName: 'Color',
    tableName: 'Colors',
    timestamps: false
})
export default class Color extends Model {
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

    @Is(HEX_REGEX)
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    hex: string;

    // @HasOne(() => Product, 'color_id')
    // product: Product

    @BelongsToMany(() => Product, () => Product_Color)
    products: Product[];
}
