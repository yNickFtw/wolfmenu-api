import { IPlan } from "../../../shared/interfaces/modules/plan/IPlan";
import { IPlanRepository } from "../../../shared/interfaces/modules/plan/repository/IPlanRepository";
import { Plan } from "../entity/plan.schema";

export default class PlanRepository implements IPlanRepository {
    public async create(plan: Partial<IPlan>): Promise<void> {
        await Plan.create({ ...plan });

        return;
    }

    public async findById(id: string): Promise<IPlan | null> {
        const plan = await Plan.findOne({ where: { id: id } });

        return plan as unknown as IPlan;
    }

    public async findByName(name: string): Promise<IPlan | null> {
        const plan = await Plan.findOne({ where: { name: name } });

        return plan as unknown as IPlan;
    }
}