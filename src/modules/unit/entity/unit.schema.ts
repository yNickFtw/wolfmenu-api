import { DataTypes } from 'sequelize'
import database from "../../../database/config";
import { UUIDV4 } from 'sequelize';

const Unit = database.define('unit', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(35),
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    cnpj: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    district: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    zip_code: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    avatarImage: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    avatarImageFilename: {
        type: DataTypes.STRING(),
        allowNull: true
    }
})

export { Unit };