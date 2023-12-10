import { Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";

import Product from "./Product.model";
import Color from "./Color.model";

@Table({
    modelName: 'Product_Color',
    tableName: 'Product_Color',
    timestamps: false
})
export default class Product_Color extends Model {
    @ForeignKey(() => Product)
    @Column(DataTypes.UUID)
    product_id: number;

    @ForeignKey(() => Color)
    @Column(DataTypes.UUID)
    color_id: number;
}
