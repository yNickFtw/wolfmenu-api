import { DataTypes, UUIDV4 } from 'sequelize'
import database from "../../../database/config";

const Plan = database.define('plan', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    price: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    stripeId: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    quantityLimitUnities: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    quantityLimitCategory: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    quantityLimitProduct: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    quantityLimitLinks: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
})

export { Plan };