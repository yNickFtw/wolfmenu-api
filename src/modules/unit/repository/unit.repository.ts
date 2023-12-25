import { IUnit } from "../../../shared/interfaces/modules/unit/IUnit";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { Unit } from "../entity/unit.schema";

export default class UnitRepository implements IUnitRepository {
    public async create(unit: Partial<IUnit>): Promise<void> {
        await Unit.create({ ...unit });

        return;
    }

    public async findByCNPJ(cnpj: string): Promise<IUnit | null> {
        const unit = await Unit.findOne({ where: { cnpj: cnpj } });

        return unit as unknown as IUnit
    }

    public async findBySlug(slug: string): Promise<IUnit | null> {
        const unit = await Unit.findOne({ where: { slug: slug } });

        return unit as unknown as IUnit;
    }
}