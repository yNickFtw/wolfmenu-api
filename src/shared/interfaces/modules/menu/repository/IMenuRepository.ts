import { IMenu } from "../IMenu";

export interface IMenuRepository {
    create(menu: Partial<IMenu>): Promise<void>;
    findByUnitId(unitId: string): Promise<IMenu>;
    findById(menuId: string): Promise<IMenu | null>;
    edit(menu: Partial<IMenu>, menuId: string): Promise<void>;
}