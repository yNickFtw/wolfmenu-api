import { IMenu } from "../../../shared/interfaces/modules/menu/IMenu";
import { IMenuRepository } from "../../../shared/interfaces/modules/menu/repository/IMenuRepository";
import { Menu } from "../entity/menu.schema";

export default class MenuRepository implements IMenuRepository {
    public async create(menu: Partial<IMenu>): Promise<void> {
        Menu.create({ menu });

        return;
    }

    public async findByUnitId(unitId: string): Promise<IMenu> {
        const menu = await Menu.findOne({ where: { unitId: unitId } });

        return menu as unknown as IMenu;
    }
}