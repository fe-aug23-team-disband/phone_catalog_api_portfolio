import {BeforeCreate, BeforeUpdate, Column, HasMany, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {md5} from "js-md5";

import Order from "./Order.model";

@Table({
    modelName: 'User',
    tableName: 'Users',
    timestamps: false
})
export default class User extends Model {
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
    name: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    salt: string;

    @HasMany(() => Order, 'owner_id')
    orders: Order[]

    @BeforeUpdate
    @BeforeCreate
    static hashPassword(instance: User) {
        instance.password = md5(instance.password + instance.salt)
    }
}
