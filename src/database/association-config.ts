import { User } from "../modules/user/entity/user.schema";
import { Unit } from "../modules/unit/entity/unit.schema";
import { Category } from "../modules/category/entity/category.schema";
import { Product } from "../modules/product/entity/product.schema";
import { ProductsVariations } from "../modules/products-variations/entity/products-variations.schema";
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

        User.hasMany(Product);
        Product.belongsTo(User);

        

        Product.hasMany(ProductsVariations);
        ProductsVariations.belongsTo(Product);

        User.hasMany(ProductsVariations);
        ProductsVariations.belongsTo(User);

        callback();
    }
}