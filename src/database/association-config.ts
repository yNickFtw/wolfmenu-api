import { User } from "../modules/user/entity/user.schema";
import { Unit } from "../modules/unit/entity/unit.schema";
import { Category } from "../modules/category/entity/category.schema";
import { Product } from "../modules/product/entity/product.schema";
//@ImportModelSync

export default class AssociationConfig {
    public init(callback: Function) {

        User.hasMany(Unit);
        Unit.belongsTo(User);

        Unit.hasMany(Category);
        Category.belongsTo(Unit);

        Unit.hasMany(Product);
        Product.belongsTo(Unit);

        Category.hasMany(Product);
        Product.belongsTo(Category);

        User.hasMany(Category);
        Category.belongsTo(User);

        User.hasMany(Product);
        Product.belongsTo(User);

        callback();
    }
}