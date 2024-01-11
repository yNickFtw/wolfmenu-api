import { IMenu } from "../../../shared/interfaces/modules/menu/IMenu";
import { IMenuRepository } from "../../../shared/interfaces/modules/menu/repository/IMenuRepository";
import { Menu } from "../entity/menu.schema";

export default class MenuRepository implements IMenuRepository {
    public async create(menu: Partial<IMenu>): Promise<void> {
        Menu.create({...menu});

        return;
    }

    public async findByUnitId(unitId: string): Promise<IMenu> {
        const menu = await Menu.findOne({ where: { unitId: unitId } });

        return menu as unknown as IMenu;
    }

    public async findById(menuId: string): Promise<IMenu | null> {
        const menu = await Menu.findOne({ where: { id: menuId } });

        return menu as unknown as IMenu;
    }

    public async edit(menu: Partial<IMenu>, menuId: string): Promise<void> {
        await Menu.update({ ...menu }, { where: { id: menuId } });

        return;
    }
}