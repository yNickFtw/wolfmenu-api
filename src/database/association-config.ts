import { User } from "../modules/user/entity/user.schema";
import { Unit } from "../modules/unit/entity/unit.schema";
import { Category } from "../modules/category/entity/category.schema";
import { Product } from "../modules/product/entity/product.schema";
import { ProductsVariations } from "../modules/products-variations/entity/products-variations.schema";
import { Menu } from "../modules/menu/entity/menu.schema";
import { MenuItem } from "../modules/menu-item/entity/menu-item.schema";
//@ImportModelSync

export default class AssociationConfig {
    public init(callback: Function) {

        User.hasMany(Unit);
        Unit.belongsTo(User);

        Category.hasMany(Product);
        Product.belongsTo(Category);

        User.hasMany(Category);
        Category.belongsTo(User);

        Unit.hasMany(Category);
        Category.belongsTo(Unit);

        Unit.hasMany(Product);
        Product.belongsTo(Unit);

        User.hasMany(Product);
        Product.belongsTo(User);

        Product.hasMany(ProductsVariations);
        ProductsVariations.belongsTo(Product);

        User.hasMany(ProductsVariations);
        ProductsVariations.belongsTo(User);

        User.hasMany(Menu);
        Menu.belongsTo(User);

        Unit.hasOne(Menu);
        Menu.belongsTo(Unit);

        Menu.hasMany(MenuItem);
        MenuItem.belongsTo(Menu);

        Category.hasMany(MenuItem);
        MenuItem.belongsTo(Category);

        Product.hasMany(MenuItem);
        MenuItem.belongsTo(Product);

        callback();
    }
}