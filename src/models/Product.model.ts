import {
    BeforeCreate,
    BeforeUpdate, BelongsTo,
    BelongsToMany,
    Column,
    ForeignKey,
    HasMany,
    Model,
    Table
} from "sequelize-typescript";
import {DataTypes} from "sequelize";

import Category from "./Category.model";
import Color from "./Color.model";
import Description from "./Description.model";
import Image from "./Image.model";
import Order from "./Order.model";
import Product_Color from "./Product_Color.model";
import Product_Order from "./Product_Order.model";
import Discount from "./Discount.model";
import slugify from "slugify";

@Table({
    modelName: 'Product',
    tableName: 'Products',
    createdAt: "time_created",
    updatedAt: "time_updated"
})
export default class Product extends Model {
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
    basename: string
    @Column({
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    })
    namespaceId: string

    // Main section
    @Column({
        type: DataTypes.STRING,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    capacity: string;

    @Column({
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    })
    capacityAvailable: string;

    @Column({
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
    })
    priceRegular: number;

    @Column(DataTypes.VIRTUAL)
    get priceDiscount(): number {
        return Math.ceil(this.priceRegular - (this.priceRegular * this.discount.value / 100))
    };
    // @ts-ignore
    set priceDiscount(value) {
        throw new Error("This value is not modifiable")
    }

    // Tech specs section
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    screen: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    resolution: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    processor: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    ram: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    camera: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    zoom: string;

    @Column({
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        allowNull: false,
    })
    cell: string[];

    // Refs
    @ForeignKey(() => Category)
    @Column
    category_id: number;

    @BelongsTo(() => Category, 'category_id')
    category: Category;

    @ForeignKey(() => Discount)
    @Column
    discount_id: number;

    @BelongsTo(() => Discount, 'discount_id')
    discount: Discount;

    // ------------------------------------------------------------------------------

    @HasMany(() => Description, 'product_id')
    description: Description[]

    @HasMany(() => Image, 'product_id')
    images: Image[]

    // ------------------------------------------------------------------------------

    @BelongsToMany(() => Color, () => Product_Color)
    colors: Color[];

    @BelongsToMany(() => Order, () => Product_Order)
    orders: Order[]

    // ------------------------------------------------------------------------------

    @BeforeUpdate
    @BeforeCreate
    static toSlug(instance: Product) {
        instance.namespaceId = slugify(instance.name, { lower: true, replacement: '-' })
    }
}
