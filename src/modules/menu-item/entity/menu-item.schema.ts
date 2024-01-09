import { DataTypes } from 'sequelize'
import database from "../../../database/config";
import { UUIDV4 } from 'sequelize';

const MenuItem = database.define('menu_items', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
    },
    isAvailable: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: true
    },
    position: {
        type: DataTypes.BIGINT(),
        allowNull: false,
    },
    highlighted: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: false,
    }
})

export { MenuItem };