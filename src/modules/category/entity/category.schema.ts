import { DataTypes } from 'sequelize'
import database from "../../../database/config";
import { UUIDV4 } from 'sequelize';

const Category = database.define('category', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    isAvailable: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: true
    }
})

export { Category };