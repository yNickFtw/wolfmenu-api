import { DataTypes } from 'sequelize'
import database from "../../../database/config";
import { UUIDV4 } from 'sequelize';

const Link = database.define('link', {
    id: {
        type: DataTypes.UUID(),
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    title: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    url: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    position: {
        type: DataTypes.BIGINT(),
        allowNull: false,
    }
})

export { Link };