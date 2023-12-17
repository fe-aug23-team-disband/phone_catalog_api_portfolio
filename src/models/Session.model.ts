import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import User from "./User.model";

@Table({
    modelName: 'Session',
    tableName: 'Sessions',
    timestamps: false
})
export default class Session extends Model {
    @Column({
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    })
    session_token: string;

    @Column({
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
    })
    refresh_token: string;

    @Column({
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
    })
    time_created: Date

    @Column(DataTypes.VIRTUAL)
    get time_expired(): number {
        return this.time_created.setHours(this.time_created.getHours() + 8)
    };
    // @ts-ignore
    set time_expired(value) {
        throw new Error("This value is not modifiable")
    }

    @ForeignKey(() => User)
    @Column
    user_id: number;

    @BelongsTo(() => User, 'user_id')
    user: User
}
