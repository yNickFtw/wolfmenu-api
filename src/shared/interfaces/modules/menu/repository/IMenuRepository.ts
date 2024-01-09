import { IMenu } from "../IMenu";

export interface IMenuRepository {
    create(menu: Partial<IMenu>): Promise<void>;
    findByUnitId(unitId: string): Promise<IMenu>;
}