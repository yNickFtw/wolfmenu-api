import { DataTypes } from 'sequelize'
import database from "../../../database/config";
import { UUIDV4 } from 'sequelize';

const MenuProduct = database.define('menu_product', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    isHighlight: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false,
    },
    position: {
        type: DataTypes.BIGINT(),
        allowNull: false,
    }
})

export { MenuProduct };