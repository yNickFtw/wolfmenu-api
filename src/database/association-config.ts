import { User } from "../modules/user/entity/user.schema";
import { Unit } from "../modules/unit/entity/unit.schema";
//@ImportModelSync

export default class AssociationConfig {
    public init(callback: Function) {

        User.hasOne(Unit);
        Unit.belongsTo(User);

        callback();
    }
}