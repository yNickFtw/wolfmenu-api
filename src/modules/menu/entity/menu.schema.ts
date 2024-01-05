import { DataTypes } from 'sequelize'
import database from "../../../database/config";
import { UUIDV4 } from 'sequelize';

const Menu = database.define('menu', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    description: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    banner: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    bannerColor: {
        type: DataTypes.STRING(),
        allowNull: false
    },
})

export { Menu };