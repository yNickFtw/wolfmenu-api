import { DataTypes } from 'sequelize'
import database from "../../../database/config";
import { UUIDV4 } from 'sequelize';

const ProductsVariations = database.define('products_variations', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4
    },
    name: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    price: {
        type: DataTypes.STRING(),
        allowNull: false,
    }
})

export { ProductsVariations };