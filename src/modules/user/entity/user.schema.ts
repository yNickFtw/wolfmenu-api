import { DataTypes, UUIDV4 } from 'sequelize'
import database from "../../../database/config";

const User = database.define('users', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(),
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    profileImage: {
        type: DataTypes.STRING(),
        allowNull: true,
        defaultValue: "",
    },
    phone: {
        type: DataTypes.STRING(),
        allowNull: true,
        defaultValue: null
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

export { User };