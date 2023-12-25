import { IUnit } from "../IUnit";

export interface IUnitRepository {
    create(unit: Partial<IUnit>): Promise<void>;
    findBySlug(slug: string): Promise<IUnit | null>;
    findByCNPJ(cnpj: string): Promise<IUnit | null>;
}