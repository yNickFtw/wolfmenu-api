import { IUnit } from "../IUnit";

export interface IUnitRepository {
    create(unit: Partial<IUnit>): Promise<void>;
    findBySlug(slug: string): Promise<IUnit | null>;
    findByCNPJ(cnpj: string): Promise<IUnit | null>;
    countAllUnitiesOfUserByUserId(userId: string): Promise<number>
    findById(unitId: string): Promise<IUnit | null>;
}