import { DataTypes } from 'sequelize'
import database from "../../../database/config";
import { UUIDV4 } from 'sequelize';

const Menu = database.define('menu', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
    },
    description: {
        type: DataTypes.TEXT(),
        allowNull: false
    },
    banner: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    bannerFilename: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    bannerColor: {
        type: DataTypes.STRING(),
        allowNull: true
    }
})

export { Menu };